-- Insertion de données d'exemple pour la table contacts
-- Com'Pro Guinée

USE comprogn;

-- Insérer 4 contacts d'exemple avec des données réalistes
INSERT INTO `contacts` (`nom`, `email`, `telephone`, `entreprise`, `sujet`, `message`, `statut`) VALUES
('Diallo Mamadou', 'mamadou.diallo@gmail.com', '+224 622 123 456', 'Tech Solutions Guinée', 'Demande de création de site web', 'Bonjour, nous souhaitons créer un site web moderne pour notre entreprise de solutions technologiques. Nous aimerions avoir plus d\'informations sur vos services et tarifs.', 'nouveau'),

('Camara Fatoumata', 'fatoumata.camara@yahoo.fr', '+224 664 789 123', 'Boutique Elegance', 'Gestion des réseaux sociaux', 'Salut ! Je dirige une boutique de mode et j\'aimerais améliorer ma présence sur les réseaux sociaux. Pouvez-vous m\'aider avec une stratégie de contenu et la gestion de mes comptes Instagram et Facebook ?', 'en_cours'),

('Barry Ibrahima', 'ibrahim.barry@hotmail.com', '+224 655 456 789', 'Restaurant Le Baobab', 'Production vidéo promotionnelle', 'Nous avons un restaurant spécialisé dans la cuisine guinéenne et nous voudrions créer des vidéos promotionnelles pour nos plats. Quels sont vos tarifs pour la production audiovisuelle ?', 'traite'),

('Touré Aissatou', 'aissatou.toure@gmail.com', '+224 628 321 654', 'Association Femmes Entrepreneurs', 'Formation en communication digitale', 'Notre association organise des formations pour les femmes entrepreneures. Nous aimerions organiser un atelier sur la communication digitale. Êtes-vous disponibles pour une intervention ?', 'nouveau');
