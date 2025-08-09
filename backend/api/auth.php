<?php
// Inclure les configurations
require_once '../config/database.php';
require_once '../includes/cors.php';

// Gérer les requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Fonction pour valider les données d'inscription
function validateRegistration($data) {
    $errors = [];
    
    if (empty($data['nom'])) {
        $errors[] = "Le nom est requis";
    }
    
    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Un email valide est requis";
    }
    
    if (empty($data['mot_de_passe']) || strlen($data['mot_de_passe']) < 6) {
        $errors[] = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    return $errors;
}

// Fonction pour valider les données de connexion
function validateLogin($data) {
    $errors = [];
    
    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Un email valide est requis";
    }
    
    if (empty($data['mot_de_passe'])) {
        $errors[] = "Le mot de passe est requis";
    }
    
    return $errors;
}

// Fonction pour nettoyer les données
function sanitizeData($data) {
    $sanitized = [];
    foreach ($data as $key => $value) {
        if ($key !== 'mot_de_passe') {
            $sanitized[$key] = htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
        } else {
            $sanitized[$key] = $value; // Ne pas nettoyer le mot de passe
        }
    }
    return $sanitized;
}

try {
    $pdo = getDbConnection();
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Récupérer les données JSON
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Données JSON invalides']);
            exit();
        }
        
        $action = $data['action'] ?? '';
        
        if ($action === 'register') {
            // INSCRIPTION
            $errors = validateRegistration($data);
            if (!empty($errors)) {
                http_response_code(400);
                echo json_encode(['error' => 'Données invalides', 'details' => $errors]);
                exit();
            }
            
            // Vérifier si l'email existe déjà
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
            $stmt->execute([':email' => $data['email']]);
            
            if ($stmt->fetch()) {
                http_response_code(409);
                echo json_encode(['error' => 'Cet email est déjà utilisé']);
                exit();
            }
            
            // Nettoyer les données
            $cleanData = sanitizeData($data);
            
            // Hacher le mot de passe
            $hashedPassword = password_hash($cleanData['mot_de_passe'], PASSWORD_DEFAULT);
            
            // Insérer le nouvel utilisateur
            $sql = "INSERT INTO users (nom, email, telephone, mot_de_passe, role) VALUES (:nom, :email, :telephone, :mot_de_passe, 'client')";
            $stmt = $pdo->prepare($sql);
            
            $result = $stmt->execute([
                ':nom' => $cleanData['nom'],
                ':email' => $cleanData['email'],
                ':telephone' => $cleanData['telephone'] ?? null,
                ':mot_de_passe' => $hashedPassword
            ]);
            
            if ($result) {
                $userId = $pdo->lastInsertId();
                
                // Récupérer les informations de l'utilisateur créé
                $stmt = $pdo->prepare("SELECT id, nom, email, telephone, role, date_creation FROM users WHERE id = :id");
                $stmt->execute([':id' => $userId]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                
                http_response_code(201);
                echo json_encode([
                    'success' => true,
                    'message' => 'Inscription réussie',
                    'user' => $user
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Erreur lors de l\'inscription']);
            }
            
        } elseif ($action === 'login') {
            // CONNEXION
            $errors = validateLogin($data);
            if (!empty($errors)) {
                http_response_code(400);
                echo json_encode(['error' => 'Données invalides', 'details' => $errors]);
                exit();
            }
            
            // Récupérer l'utilisateur
            $stmt = $pdo->prepare("SELECT id, nom, email, telephone, mot_de_passe, role, date_creation FROM users WHERE email = :email");
            $stmt->execute([':email' => $data['email']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$user || !password_verify($data['mot_de_passe'], $user['mot_de_passe'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Email ou mot de passe incorrect']);
                exit();
            }
            
            // Supprimer le mot de passe de la réponse
            unset($user['mot_de_passe']);
            
            echo json_encode([
                'success' => true,
                'message' => 'Connexion réussie',
                'user' => $user
            ]);
            
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Action non reconnue']);
        }
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Vérifier si c'est la première visite (aucun utilisateur inscrit)
        $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM users");
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'first_visit' => $result['count'] == 0,
            'users_count' => (int)$result['count']
        ]);
        
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
    }
    
} catch (PDOException $e) {
    error_log("Erreur base de données: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erreur de base de données']);
} catch (Exception $e) {
    error_log("Erreur générale: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erreur interne du serveur']);
}
?>
