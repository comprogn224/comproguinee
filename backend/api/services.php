<?php
/**
 * API des services
 * Com'Pro Guinée - Backend API
 */

require_once '../config/database.php';
require_once '../includes/cors.php';

class ServicesAPI {
    private $conn;
    private $table_name = "services";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Récupérer tous les services actifs
    public function getServices($limit = null) {
        $query = "SELECT 
                    id, titre, description, description_courte, 
                    prix_min, prix_max, duree_estimee, icone, image, 
                    ordre_affichage, DATE_FORMAT(date_creation, '%Y-%m-%d') as date_creation
                  FROM " . $this->table_name . " 
                  WHERE actif = 1
                  ORDER BY ordre_affichage ASC, date_creation DESC";
        
        if ($limit) {
            $query .= " LIMIT " . intval($limit);
        }

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $services = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $services[] = [
                'id' => (int)$row['id'],
                'title' => $row['titre'],
                'description' => $row['description'],
                'shortDescription' => $row['description_courte'],
                'priceMin' => $row['prix_min'] ? (float)$row['prix_min'] : null,
                'priceMax' => $row['prix_max'] ? (float)$row['prix_max'] : null,
                'duration' => $row['duree_estimee'],
                'icon' => $row['icone'],
                'image' => $row['image'],
                'order' => (int)$row['ordre_affichage'],
                'dateCreated' => $row['date_creation']
            ];
        }

        return $services;
    }

    // Récupérer un service par ID
    public function getServiceById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id AND actif = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            return [
                'id' => (int)$row['id'],
                'title' => $row['titre'],
                'description' => $row['description'],
                'shortDescription' => $row['description_courte'],
                'priceMin' => $row['prix_min'] ? (float)$row['prix_min'] : null,
                'priceMax' => $row['prix_max'] ? (float)$row['prix_max'] : null,
                'duration' => $row['duree_estimee'],
                'icon' => $row['icone'],
                'image' => $row['image'],
                'order' => (int)$row['ordre_affichage'],
                'dateCreated' => $row['date_creation']
            ];
        }

        return null;
    }
}

// Traitement des requêtes
try {
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        throw new Exception("Erreur de connexion à la base de données");
    }

    $servicesAPI = new ServicesAPI($db);
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                $service = $servicesAPI->getServiceById($_GET['id']);
                if ($service) {
                    echo json_encode([
                        'success' => true,
                        'service' => $service
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode([
                        'success' => false,
                        'message' => 'Service non trouvé'
                    ]);
                }
            } else {
                $limit = isset($_GET['limit']) ? intval($_GET['limit']) : null;
                $services = $servicesAPI->getServices($limit);
                
                echo json_encode([
                    'success' => true,
                    'services' => $services,
                    'total' => count($services)
                ]);
            }
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
