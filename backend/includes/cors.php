<?php
/**
 * Configuration CORS pour permettre les requêtes depuis Next.js
 * Com'Pro Guinée - Backend API
 */

// Permettre les requêtes depuis localhost:3000 (Next.js dev server)
$allowed_origins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://your-domain.com' // Remplacer par votre domaine en production
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Configuration CORS plus robuste
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // En développement, permettre localhost même sans HTTP_ORIGIN
    header("Access-Control-Allow-Origin: http://localhost:3000");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400"); // Cache preflight pour 24h

// Gérer les requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Définir le type de contenu JSON
header("Content-Type: application/json; charset=UTF-8");
?>
