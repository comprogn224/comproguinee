<?php
/**
 * API des informations "À propos"
 * Com'Pro Guinée - Backend API
 */

require_once '../config/database.php';
require_once '../includes/cors.php';

class AboutAPI {
    private $conn;
    private $table_name = "about";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Récupérer toutes les sections "À propos"
    public function getAboutSections() {
        $query = "SELECT 
                    id, section, titre, contenu, image, ordre_affichage,
                    DATE_FORMAT(date_creation, '%Y-%m-%d') as date_creation
                  FROM " . $this->table_name . " 
                  WHERE actif = 1
                  ORDER BY ordre_affichage ASC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $sections = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $sections[] = [
                'id' => (int)$row['id'],
                'section' => $row['section'],
                'title' => $row['titre'],
                'content' => $row['contenu'],
                'image' => $row['image'],
                'order' => (int)$row['ordre_affichage'],
                'dateCreated' => $row['date_creation']
            ];
        }

        return $sections;
    }

    // Récupérer une section spécifique
    public function getSectionByType($section_type) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE section = :section AND actif = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":section", $section_type);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            return [
                'id' => (int)$row['id'],
                'section' => $row['section'],
                'title' => $row['titre'],
                'content' => $row['contenu'],
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

    $aboutAPI = new AboutAPI($db);
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            if (isset($_GET['section'])) {
                $section = $aboutAPI->getSectionByType($_GET['section']);
                if ($section) {
                    echo json_encode([
                        'success' => true,
                        'section' => $section
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode([
                        'success' => false,
                        'message' => 'Section non trouvée'
                    ]);
                }
            } else {
                $sections = $aboutAPI->getAboutSections();
                
                echo json_encode([
                    'success' => true,
                    'sections' => $sections,
                    'total' => count($sections)
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
