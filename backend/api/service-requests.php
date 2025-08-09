<?php
// Inclure les configurations
require_once '../config/database.php';
require_once '../includes/cors.php';

// Gérer les requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Fonction pour valider les données d'entrée
function validateServiceRequest($data) {
    $errors = [];
    
    if (empty($data['nom'])) {
        $errors[] = "Le nom est requis";
    }
    
    if (empty($data['prenom'])) {
        $errors[] = "Le prénom est requis";
    }
    
    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Un email valide est requis";
    }
    
    if (empty($data['description'])) {
        $errors[] = "La description du projet est requise";
    }
    
    if (empty($data['services']) || !is_array($data['services'])) {
        $errors[] = "Au moins un service doit être sélectionné";
    }
    
    return $errors;
}

// Fonction pour nettoyer les données
function sanitizeData($data) {
    $sanitized = [];
    foreach ($data as $key => $value) {
        if (is_array($value)) {
            $sanitized[$key] = array_map(function($item) {
                return htmlspecialchars(strip_tags(trim($item)), ENT_QUOTES, 'UTF-8');
            }, $value);
        } else {
            $sanitized[$key] = htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
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
        
        // Valider les données
        $errors = validateServiceRequest($data);
        if (!empty($errors)) {
            http_response_code(400);
            echo json_encode(['error' => 'Données invalides', 'details' => $errors]);
            exit();
        }
        
        // Nettoyer les données
        $cleanData = sanitizeData($data);
        
        // Préparer la requête d'insertion
        $sql = "INSERT INTO demandes_service (
                    nom, prenom, entreprise, email, telephone, 
                    services, budget, delai, description, objectifs, 
                    cible, concurrents, existant, statut
                ) VALUES (
                    :nom, :prenom, :entreprise, :email, :telephone,
                    :services, :budget, :delai, :description, :objectifs,
                    :cible, :concurrents, :existant, 'nouveau'
                )";
        
        $stmt = $pdo->prepare($sql);
        
        // Convertir le tableau des services en JSON
        $servicesJson = json_encode($cleanData['services']);
        
        // Exécuter la requête
        $result = $stmt->execute([
            ':nom' => $cleanData['nom'],
            ':prenom' => $cleanData['prenom'],
            ':entreprise' => $cleanData['entreprise'] ?? null,
            ':email' => $cleanData['email'],
            ':telephone' => $cleanData['telephone'] ?? null,
            ':services' => $servicesJson,
            ':budget' => $cleanData['budget'] ?? null,
            ':delai' => $cleanData['delai'] ?? null,
            ':description' => $cleanData['description'],
            ':objectifs' => $cleanData['objectifs'] ?? null,
            ':cible' => $cleanData['cible'] ?? null,
            ':concurrents' => $cleanData['concurrents'] ?? null,
            ':existant' => $cleanData['existant'] ?? null
        ]);
        
        if ($result) {
            $requestId = $pdo->lastInsertId();
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Demande de service enregistrée avec succès',
                'id' => $requestId
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de l\'enregistrement']);
        }
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Récupérer les demandes de service (pour l'administration)
        $statut = $_GET['statut'] ?? null;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
        $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
        
        $sql = "SELECT * FROM demandes_service";
        $params = [];
        
        if ($statut) {
            $sql .= " WHERE statut = :statut";
            $params[':statut'] = $statut;
        }
        
        $sql .= " ORDER BY date_creation DESC LIMIT :limit OFFSET :offset";
        
        $stmt = $pdo->prepare($sql);
        
        // Lier les paramètres
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        
        $stmt->execute();
        $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Décoder les services JSON pour chaque demande
        foreach ($requests as &$request) {
            $request['services'] = json_decode($request['services'], true);
        }
        
        echo json_encode([
            'success' => true,
            'data' => $requests,
            'count' => count($requests)
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
