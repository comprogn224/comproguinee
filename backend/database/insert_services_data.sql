-- Insertion de données d'exemple pour les services
-- Com'Pro Guinée

USE comprogn;

-- Vider la table services d'abord (optionnel)
-- DELETE FROM services;

-- Insérer les services avec des données réalistes
INSERT INTO services (titre, description, description_courte, prix_min, prix_max, duree_estimee, icone, actif, ordre_affichage) VALUES
('Stratégie Digitale', 
 'Développement de stratégies personnalisées pour maximiser votre impact en ligne et atteindre vos objectifs business. Nous analysons votre marché, définissons vos personas et créons un plan d\'action détaillé avec des KPIs mesurables.',
 'Développement de stratégies personnalisées pour maximiser votre impact en ligne',
 500000, 1500000, '2-4 semaines', 'target', TRUE, 1),

('Création de Contenu', 
 'Production de contenus visuels et textuels engageants pour captiver vos audiences sur tous les canaux. Rédaction web, création graphique, vidéos promotionnelles et calendrier éditorial personnalisé.',
 'Production de contenus visuels et textuels engageants pour vos audiences',
 400000, 800000, '1-3 semaines', 'zap', TRUE, 2),

('Gestion Réseaux Sociaux', 
 'Animation et gestion professionnelle de vos comptes sur les principales plateformes sociales. Community management, publications quotidiennes, interaction avec l\'audience et reporting mensuel détaillé.',
 'Animation et gestion professionnelle de vos comptes sur les réseaux sociaux',
 550000, 1200000, 'Mensuel', 'users', TRUE, 3),

('Création de Sites Web', 
 'Conception et développement de sites web modernes, responsives et optimisés pour le référencement. Design sur mesure, intégration CMS et formation à la gestion de votre site.',
 'Conception et développement de sites web modernes et responsives',
 1500000, 5000000, '4-8 semaines', 'globe', TRUE, 4),

('Production Audiovisuelle', 
 'Réalisation de contenus photo et vidéo professionnels pour valoriser votre marque et vos produits. Shooting produits, vidéos corporate, reportages événements et post-production complète.',
 'Réalisation de contenus photo et vidéo professionnels',
 600000, 2000000, '1-2 semaines', 'camera', TRUE, 5),

('Publicité Digitale', 
 'Création et gestion de campagnes publicitaires ciblées sur Facebook, Instagram et Google. Ciblage précis, création des visuels, optimisation continue et rapports détaillés de performance.',
 'Création et gestion de campagnes publicitaires ciblées',
 200000, 500000, '2-4 semaines', 'megaphone', TRUE, 6),

('Marketing Mobile', 
 'Stratégies marketing adaptées aux usages mobiles pour toucher vos clients où qu\'ils soient. SMS marketing, applications mobiles, géolocalisation et push notifications personnalisées.',
 'Stratégies marketing adaptées aux usages mobiles',
 250000, 800000, '3-6 semaines', 'smartphone', TRUE, 7),

('Consulting Digital', 
 'Accompagnement personnalisé pour votre transformation digitale. Audit complet, recommandations stratégiques, formation de vos équipes et suivi de la mise en œuvre.',
 'Accompagnement personnalisé pour votre transformation digitale',
 300000, 1000000, '1-4 semaines', 'pen-tool', TRUE, 8);

-- Vérifier l'insertion
SELECT COUNT(*) as total_services FROM services WHERE actif = 1;
