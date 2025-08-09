-- Table pour les demandes de service
CREATE TABLE IF NOT EXISTS `demandes_service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `entreprise` varchar(200) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `services` TEXT NOT NULL COMMENT 'Services demandés (JSON array)',
  `budget` varchar(50) DEFAULT NULL,
  `delai` varchar(50) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `objectifs` TEXT DEFAULT NULL,
  `cible` TEXT DEFAULT NULL,
  `concurrents` TEXT DEFAULT NULL,
  `existant` TEXT DEFAULT NULL,
  `statut` ENUM('nouveau', 'en_cours', 'traite', 'termine') DEFAULT 'nouveau',
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modification` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_email` (`email`),
  INDEX `idx_statut` (`statut`),
  INDEX `idx_date_creation` (`date_creation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insérer quelques données d'exemple pour les tests
INSERT INTO `demandes_service` (`nom`, `prenom`, `entreprise`, `email`, `telephone`, `services`, `budget`, `delai`, `description`, `objectifs`, `cible`, `statut`) VALUES
('Diallo', 'Mamadou', 'Tech Solutions Guinée', 'mamadou.diallo@techsolutions.gn', '+224 622 123 456', '["Création de Sites Web", "Gestion Réseaux Sociaux"]', '1000000-5000000', '1-mois', 'Nous souhaitons créer un site web moderne pour notre entreprise de solutions technologiques et mettre en place une stratégie de réseaux sociaux.', 'Améliorer notre visibilité en ligne et attirer de nouveaux clients', 'PME et startups en Guinée', 'nouveau'),
('Camara', 'Fatoumata', 'Boutique Elegance', 'fatoumata@elegance.gn', '+224 664 789 123', '["Publicité Digitale", "Création de Contenu"]', '500000-1000000', '2-3-mois', 'Lancement d\'une campagne publicitaire pour notre nouvelle collection de mode.', 'Augmenter les ventes en ligne de 50%', 'Femmes de 25-45 ans en Guinée', 'en_cours'),
('Barry', 'Ibrahima', 'Restaurant Le Baobab', 'ibrahim.barry@lebaobab.gn', '+224 655 456 789', '["Stratégie Digitale", "Production Audiovisuelle"]', '2000000-5000000', '1-2-semaines', 'Création de contenu vidéo pour promouvoir notre restaurant et nos spécialités culinaires guinéennes.', 'Devenir le restaurant le plus connu de Conakry', 'Familles et touristes', 'traite');
