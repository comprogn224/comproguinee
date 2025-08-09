<?php
/**
 * Configuration de la base de données
 * Com'Pro Guinée - Backend API
 */

class Database {
    private $host = 'localhost';
    private $db_name = 'comprogn';
    private $username = 'root'; // Par défaut pour XAMPP
    private $password = '';     // Par défaut pour XAMPP
    private $charset = 'utf8mb4';
    public $conn;

    public function getConnection() {
        $this->conn = null;
        
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
        } catch(PDOException $exception) {
            echo "Erreur de connexion: " . $exception->getMessage();
        }
        
        return $this->conn;
    }
}

/**
 * Fonction helper pour obtenir une connexion à la base de données
 * Compatible avec les APIs existantes
 */
function getDbConnection() {
    $database = new Database();
    return $database->getConnection();
}
?>
