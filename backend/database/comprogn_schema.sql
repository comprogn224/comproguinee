-- Base de données Com'Pro Guinée
-- Créer la base de données
CREATE DATABASE IF NOT EXISTS comprogn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE comprogn;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    mot_de_passe VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client') DEFAULT 'client',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des contacts/demandes
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telephone VARCHAR(20),
    entreprise VARCHAR(100),
    sujet VARCHAR(200),
    message TEXT NOT NULL,
    statut ENUM('nouveau', 'en_cours', 'traite', 'ferme') DEFAULT 'nouveau',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des services
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(150) NOT NULL,
    description TEXT,
    description_courte VARCHAR(300),
    prix_min DECIMAL(10,2),
    prix_max DECIMAL(10,2),
    duree_estimee VARCHAR(50),
    icone VARCHAR(100), -- Nom de l'icône (ex: 'target', 'zap', 'users')
    image VARCHAR(255), -- Chemin vers l'image du service
    actif BOOLEAN DEFAULT TRUE,
    ordre_affichage INT DEFAULT 0,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des projets/portfolio
CREATE TABLE IF NOT EXISTS projets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(150) NOT NULL,
    description TEXT,
    description_courte VARCHAR(300),
    client VARCHAR(100),
    secteur VARCHAR(100),
    technologies TEXT, -- JSON ou texte séparé par virgules
    image_principale VARCHAR(255),
    images_galerie TEXT, -- JSON array des images
    url_projet VARCHAR(255),
    date_debut DATE,
    date_fin DATE,
    statut ENUM('en_cours', 'termine', 'suspendu') DEFAULT 'termine',
    featured BOOLEAN DEFAULT FALSE, -- Pour mettre en avant certains projets
    ordre_affichage INT DEFAULT 0,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des témoignages
CREATE TABLE IF NOT EXISTS temoignages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    entreprise VARCHAR(100),
    poste VARCHAR(100),
    email VARCHAR(150),
    telephone VARCHAR(20),
    message TEXT NOT NULL,
    note INT CHECK (note >= 1 AND note <= 5) DEFAULT 5,
    avatar VARCHAR(255), -- Chemin vers l'avatar
    approuve BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE, -- Pour mettre en avant certains témoignages
    ordre_affichage INT DEFAULT 0,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des informations "À propos"
CREATE TABLE IF NOT EXISTS about (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section VARCHAR(50) NOT NULL, -- 'mission', 'vision', 'valeurs', 'equipe', etc.
    titre VARCHAR(150),
    contenu TEXT,
    image VARCHAR(255),
    ordre_affichage INT DEFAULT 0,
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion de données d'exemple pour les témoignages
INSERT INTO temoignages (nom, entreprise, poste, message, note, approuve, featured, ordre_affichage) VALUES
('Amadou Diallo', 'StartUp Tech Conakry', 'CEO', 'Com\'Pro Guinée a transformé notre présence digitale. Leur expertise nous a permis d\'atteindre de nouveaux clients et d\'augmenter notre chiffre d\'affaires de 150%.', 5, TRUE, TRUE, 1),
('Fatoumata Camara', 'Boutique Mode Guinée', 'Propriétaire', 'Une équipe professionnelle qui comprend les enjeux du marché guinéen. Résultats au rendez-vous ! Nos ventes en ligne ont triplé.', 5, TRUE, TRUE, 2),
('Ibrahim Touré', 'Restaurant Le Baobab', 'Gérant', 'Grâce à leur stratégie social media, notre restaurant est maintenant connu dans tout Conakry. Nous avons 300% plus de réservations.', 5, TRUE, TRUE, 3),
('Mariama Bah', 'Clinique Santé Plus', 'Directrice', 'Com\'Pro Guinée nous a aidés à digitaliser notre communication patient. Interface moderne et service client exceptionnel.', 5, TRUE, FALSE, 4),
('Ousmane Kaba', 'Transport Express GN', 'Directeur Marketing', 'Leur solution de gestion des réseaux sociaux a révolutionné notre approche marketing. ROI impressionnant !', 5, TRUE, FALSE, 5),
('Aissatou Diané', 'École Privée Excellence', 'Directrice', 'Communication digitale parfaitement adaptée au secteur éducatif guinéen. Parents et élèves sont ravis.', 5, TRUE, FALSE, 6);

-- Insertion de données d'exemple pour les services
INSERT INTO services (titre, description, description_courte, icone, actif, ordre_affichage) VALUES
('Stratégie Digitale', 'Développement de stratégies personnalisées pour maximiser votre impact en ligne avec une approche data-driven et des objectifs mesurables.', 'Développement de stratégies personnalisées pour maximiser votre impact en ligne', 'target', TRUE, 1),
('Création de Contenu', 'Production de contenus visuels et textuels engageants pour vos audiences avec une approche créative et professionnelle.', 'Production de contenus visuels et textuels engageants pour vos audiences', 'zap', TRUE, 2),
('Gestion Réseaux Sociaux', 'Animation et gestion professionnelle de vos comptes sur les réseaux sociaux avec une stratégie adaptée à votre secteur.', 'Animation et gestion professionnelle de vos comptes sur les réseaux sociaux', 'users', TRUE, 3);

-- Insertion de données d'exemple pour la section "À propos"
INSERT INTO about (section, titre, contenu, ordre_affichage) VALUES
('mission', 'Notre Mission', 'Accompagner les entrepreneurs, PME et startups de Guinée dans leur transformation digitale avec des solutions de communication innovantes et sur mesure.', 1),
('vision', 'Notre Vision', 'Devenir le partenaire de référence en communication digitale en Guinée en proposant des solutions adaptées au contexte local.', 2),
('valeurs', 'Nos Valeurs', 'Excellence, Innovation, Proximité et Engagement envers nos clients pour des résultats durables.', 3);
