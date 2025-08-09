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

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Gérer les requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Définir le type de contenu JSON
header("Content-Type: application/json; charset=UTF-8");
?>
