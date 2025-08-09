<?php
/**
 * API des témoignages
 * Com'Pro Guinée - Backend API
 */

require_once '../config/database.php';
require_once '../includes/cors.php';

class TestimonialsAPI {
    private $conn;
    private $table_name = "temoignages";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Récupérer tous les témoignages approuvés
    public function getTestimonials($limit = null, $featured_only = false) {
        $query = "SELECT 
                    id, nom, entreprise, poste, message, note, avatar, 
                    DATE_FORMAT(date_creation, '%Y-%m-%d') as date,
                    featured, ordre_affichage
                  FROM " . $this->table_name . " 
                  WHERE approuve = 1";
        
        if ($featured_only) {
            $query .= " AND featured = 1";
        }
        
        $query .= " ORDER BY ordre_affichage ASC, date_creation DESC";
        
        if ($limit) {
            $query .= " LIMIT " . intval($limit);
        }

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $testimonials = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Formater les données pour le frontend
            $testimonials[] = [
                'id' => (int)$row['id'],
                'name' => $row['nom'],
                'company' => $row['entreprise'],
                'position' => $row['poste'],
                'text' => $row['message'],
                'rating' => (int)$row['note'],
                'avatar' => $row['avatar'],
                'date' => $row['date'],
                'featured' => (bool)$row['featured']
            ];
        }

        return $testimonials;
    }

    // Ajouter un nouveau témoignage
    public function addTestimonial($data) {
        $query = "INSERT INTO " . $this->table_name . " 
                  (nom, entreprise, poste, email, telephone, message, note, approuve) 
                  VALUES (:nom, :entreprise, :poste, :email, :telephone, :message, :note, 0)";

        $stmt = $this->conn->prepare($query);

        // Nettoyer les données
        $data['nom'] = htmlspecialchars(strip_tags($data['nom']));
        $data['entreprise'] = htmlspecialchars(strip_tags($data['entreprise']));
        $data['poste'] = htmlspecialchars(strip_tags($data['poste'] ?? ''));
        $data['email'] = htmlspecialchars(strip_tags($data['email'] ?? ''));
        $data['telephone'] = htmlspecialchars(strip_tags($data['telephone'] ?? ''));
        $data['message'] = htmlspecialchars(strip_tags($data['message']));
        $data['note'] = max(1, min(5, intval($data['note']))); // Entre 1 et 5

        // Lier les paramètres
        $stmt->bindParam(":nom", $data['nom']);
        $stmt->bindParam(":entreprise", $data['entreprise']);
        $stmt->bindParam(":poste", $data['poste']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":telephone", $data['telephone']);
        $stmt->bindParam(":message", $data['message']);
        $stmt->bindParam(":note", $data['note']);

        if ($stmt->execute()) {
            return [
                'success' => true,
                'message' => 'Témoignage ajouté avec succès. Il sera visible après approbation.',
                'id' => $this->conn->lastInsertId()
            ];
        }

        return [
            'success' => false,
            'message' => 'Erreur lors de l\'ajout du témoignage.'
        ];
    }
}

// Traitement des requêtes
try {
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        throw new Exception("Erreur de connexion à la base de données");
    }

    $testimonialsAPI = new TestimonialsAPI($db);
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : null;
            $featured_only = isset($_GET['featured']) && $_GET['featured'] === 'true';
            
            $testimonials = $testimonialsAPI->getTestimonials($limit, $featured_only);
            
            echo json_encode([
                'success' => true,
                'testimonials' => $testimonials,
                'total' => count($testimonials)
            ]);
            break;

        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input) {
                throw new Exception("Données JSON invalides");
            }

            // Validation des champs requis
            $required_fields = ['nom', 'entreprise', 'message', 'note'];
            foreach ($required_fields as $field) {
                if (empty($input[$field])) {
                    throw new Exception("Le champ '$field' est requis");
                }
            }

            $result = $testimonialsAPI->addTestimonial($input);
            echo json_encode($result);
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
