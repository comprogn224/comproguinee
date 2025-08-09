<?php
/**
 * API des projets/réalisations
 * Com'Pro Guinée - Backend API
 */

require_once '../config/database.php';
require_once '../includes/cors.php';

class ProjectsAPI {
    private $conn;
    private $table_name = "projets";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Récupérer tous les projets
    public function getProjects($limit = null, $featured_only = false) {
        $query = "SELECT 
                    id, titre, description, description_courte, client, secteur,
                    technologies, image_principale, images_galerie, url_projet,
                    date_debut, date_fin, statut, featured, ordre_affichage,
                    DATE_FORMAT(date_creation, '%Y-%m-%d') as date_creation
                  FROM " . $this->table_name;
        
        $conditions = [];
        if ($featured_only) {
            $conditions[] = "featured = 1";
        }
        
        if (!empty($conditions)) {
            $query .= " WHERE " . implode(" AND ", $conditions);
        }
        
        $query .= " ORDER BY ordre_affichage ASC, date_creation DESC";
        
        if ($limit) {
            $query .= " LIMIT " . intval($limit);
        }

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $projects = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Décoder les technologies et images si elles sont en JSON
            $technologies = $row['technologies'] ? json_decode($row['technologies'], true) : [];
            $gallery = $row['images_galerie'] ? json_decode($row['images_galerie'], true) : [];
            
            $projects[] = [
                'id' => (int)$row['id'],
                'title' => $row['titre'],
                'description' => $row['description'],
                'shortDescription' => $row['description_courte'],
                'client' => $row['client'],
                'sector' => $row['secteur'],
                'technologies' => is_array($technologies) ? $technologies : explode(',', $row['technologies']),
                'mainImage' => $row['image_principale'],
                'gallery' => is_array($gallery) ? $gallery : [],
                'url' => $row['url_projet'],
                'startDate' => $row['date_debut'],
                'endDate' => $row['date_fin'],
                'status' => $row['statut'],
                'featured' => (bool)$row['featured'],
                'order' => (int)$row['ordre_affichage'],
                'dateCreated' => $row['date_creation']
            ];
        }

        return $projects;
    }

    // Récupérer un projet par ID
    public function getProjectById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $technologies = $row['technologies'] ? json_decode($row['technologies'], true) : [];
            $gallery = $row['images_galerie'] ? json_decode($row['images_galerie'], true) : [];
            
            return [
                'id' => (int)$row['id'],
                'title' => $row['titre'],
                'description' => $row['description'],
                'shortDescription' => $row['description_courte'],
                'client' => $row['client'],
                'sector' => $row['secteur'],
                'technologies' => is_array($technologies) ? $technologies : explode(',', $row['technologies']),
                'mainImage' => $row['image_principale'],
                'gallery' => is_array($gallery) ? $gallery : [],
                'url' => $row['url_projet'],
                'startDate' => $row['date_debut'],
                'endDate' => $row['date_fin'],
                'status' => $row['statut'],
                'featured' => (bool)$row['featured'],
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

    $projectsAPI = new ProjectsAPI($db);
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                $project = $projectsAPI->getProjectById($_GET['id']);
                if ($project) {
                    echo json_encode([
                        'success' => true,
                        'project' => $project
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode([
                        'success' => false,
                        'message' => 'Projet non trouvé'
                    ]);
                }
            } else {
                $limit = isset($_GET['limit']) ? intval($_GET['limit']) : null;
                $featured_only = isset($_GET['featured']) && $_GET['featured'] === 'true';
                
                $projects = $projectsAPI->getProjects($limit, $featured_only);
                
                echo json_encode([
                    'success' => true,
                    'projects' => $projects,
                    'total' => count($projects)
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
