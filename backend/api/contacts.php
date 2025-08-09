<?php
/**
 * API des contacts/demandes
 * Com'Pro Guinée - Backend API
 */

require_once '../config/database.php';
require_once '../includes/cors.php';

class ContactsAPI {
    private $conn;
    private $table_name = "contacts";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Ajouter un nouveau contact/demande
    public function addContact($data) {
        $query = "INSERT INTO " . $this->table_name . " 
                  (nom, email, telephone, entreprise, sujet, message) 
                  VALUES (:nom, :email, :telephone, :entreprise, :sujet, :message)";

        $stmt = $this->conn->prepare($query);

        // Nettoyer les données
        $data['nom'] = htmlspecialchars(strip_tags($data['nom']));
        $data['email'] = htmlspecialchars(strip_tags($data['email']));
        $data['telephone'] = htmlspecialchars(strip_tags($data['telephone'] ?? ''));
        $data['entreprise'] = htmlspecialchars(strip_tags($data['entreprise'] ?? ''));
        $data['sujet'] = htmlspecialchars(strip_tags($data['sujet'] ?? ''));
        $data['message'] = htmlspecialchars(strip_tags($data['message']));

        // Lier les paramètres
        $stmt->bindParam(":nom", $data['nom']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":telephone", $data['telephone']);
        $stmt->bindParam(":entreprise", $data['entreprise']);
        $stmt->bindParam(":sujet", $data['sujet']);
        $stmt->bindParam(":message", $data['message']);

        if ($stmt->execute()) {
            return [
                'success' => true,
                'message' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
                'id' => $this->conn->lastInsertId()
            ];
        }

        return [
            'success' => false,
            'message' => 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
        ];
    }

    // Récupérer tous les contacts (pour l'admin)
    public function getContacts($limit = null, $status = null) {
        $query = "SELECT 
                    id, nom, email, telephone, entreprise, sujet, message, statut,
                    DATE_FORMAT(date_creation, '%Y-%m-%d %H:%i') as date_creation
                  FROM " . $this->table_name;
        
        if ($status) {
            $query .= " WHERE statut = :status";
        }
        
        $query .= " ORDER BY date_creation DESC";
        
        if ($limit) {
            $query .= " LIMIT " . intval($limit);
        }

        $stmt = $this->conn->prepare($query);
        
        if ($status) {
            $stmt->bindParam(":status", $status);
        }
        
        $stmt->execute();

        $contacts = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $contacts[] = [
                'id' => (int)$row['id'],
                'name' => $row['nom'],
                'email' => $row['email'],
                'phone' => $row['telephone'],
                'company' => $row['entreprise'],
                'subject' => $row['sujet'],
                'message' => $row['message'],
                'status' => $row['statut'],
                'dateCreated' => $row['date_creation']
            ];
        }

        return $contacts;
    }
}

// Traitement des requêtes
try {
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        throw new Exception("Erreur de connexion à la base de données");
    }

    $contactsAPI = new ContactsAPI($db);
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input) {
                throw new Exception("Données JSON invalides");
            }

            // Validation des champs requis
            $required_fields = ['nom', 'email', 'message'];
            foreach ($required_fields as $field) {
                if (empty($input[$field])) {
                    throw new Exception("Le champ '$field' est requis");
                }
            }

            // Validation de l'email
            if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
                throw new Exception("Adresse email invalide");
            }

            $result = $contactsAPI->addContact($input);
            echo json_encode($result);
            break;

        case 'GET':
            // Cette route est pour l'administration
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : null;
            $status = isset($_GET['status']) ? $_GET['status'] : null;
            
            $contacts = $contactsAPI->getContacts($limit, $status);
            
            echo json_encode([
                'success' => true,
                'contacts' => $contacts,
                'total' => count($contacts)
            ]);
            break;

        default:
            http_response_code(405);
            echo json_encode([
                'success' => false,
                'message' => 'Méthode non autorisée'
            ]);
            break;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
