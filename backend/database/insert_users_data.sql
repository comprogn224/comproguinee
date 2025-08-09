-- Insertion de données d'exemple pour la table users
-- Com'Pro Guinée

USE comprogn;

-- Insérer 4 utilisateurs d'exemple avec des données réalistes
-- Note: Les mots de passe sont hachés avec password_hash() en PHP
-- Mot de passe en clair pour tous: "ComPro2024!"

INSERT INTO `users` (`nom`, `email`, `telephone`, `mot_de_passe`, `role`) VALUES

('Administrateur Principal', 
'admin@compro-guinee.com', 
'+224 622 000 001', 
'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
'admin'),

('Diallo Amadou', 
'amadou.diallo@compro-guinee.com', 
'+224 622 111 222', 
'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
'admin'),

('Camara Mariama', 
'mariama.camara@gmail.com', 
'+224 664 333 444', 
'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
'client'),

('Barry Ousmane', 
'ousmane.barry@yahoo.fr', 
'+224 655 555 666', 
'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
'client');
