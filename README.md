# 🚀 Com'Pro Guinée - Plateforme de Communication Digitale

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)
[![PHP](https://img.shields.io/badge/PHP-8.2+-purple)](https://php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8+-orange)](https://mysql.com/)

## 📋 Description du Projet

**Com'Pro Guinée** est une plateforme web moderne dédiée aux services de communication digitale en Guinée. Cette application full-stack combine un frontend Next.js/React avec un backend PHP/MySQL pour offrir une expérience utilisateur dynamique et une gestion de contenu flexible.

### 🎯 Objectifs

- Présenter les services de communication digitale de Com'Pro Guinée
- Permettre aux clients de découvrir les réalisations et témoignages
- Faciliter les demandes de devis et contacts
- Offrir une interface d'administration pour la gestion du contenu

## 🏗️ Architecture Technique

### Frontend
- **Framework :** Next.js 15.2.4 avec App Router
- **Langage :** TypeScript
- **UI/UX :** Tailwind CSS + Shadcn/ui
- **Gestion d'état :** Hooks React personnalisés
- **Icônes :** Lucide React

### Backend
- **Langage :** PHP 8.2+
- **Base de données :** MySQL 8+
- **APIs :** RESTful avec architecture MVC
- **Sécurité :** PDO, validation des données, CORS

### Infrastructure
- **Développement :** XAMPP (Apache + MySQL + PHP)
- **Déploiement :** Compatible avec tout hébergeur PHP/MySQL

## 🚀 Installation et Configuration

### Prérequis

- [Node.js](https://nodejs.org/) 18+ et npm/yarn
- [XAMPP](https://www.apachefriends.org/) ou serveur LAMP/WAMP
- Git

### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/ComProGuinee2.git
cd ComProGuinee2
```

### 2. Installation des dépendances Frontend

```bash
npm install
# ou
yarn install
```

### 3. Configuration de la base de données

1. **Démarrer XAMPP** (Apache + MySQL)
2. **Accéder à phpMyAdmin** : `http://localhost/phpmyadmin`
3. **Créer la base de données** `comprogn`
4. **Importer le schéma** : `backend/database/comprogn_schema.sql`
5. **Ajouter des données d'exemple** : `backend/database/insert_services_data.sql`

### 4. Déploiement du Backend PHP

```bash
# Copier le dossier backend vers XAMPP
cp -r backend/ /path/to/xampp/htdocs/backend/
# Exemple Windows : C:\xampp\htdocs\backend\
```

### 5. Configuration des variables d'environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost/backend/api
```

### 6. Lancement de l'application

```bash
# Démarrer le serveur de développement Next.js
npm run dev

# L'application sera accessible sur http://localhost:3000
```

## 📁 Structure du Projet

```
ComProGuinee2/
├── app/                          # Pages Next.js (App Router)
│   ├── page.tsx                  # Page d'accueil
│   ├── nos-services/             # Page des services
│   ├── testimonages/             # Page des témoignages
│   ├── nos-realisations/         # Page du portfolio
│   ├── a-propos/                 # Page à propos
│   ├── contact/                  # Page de contact
│   └── demande-service/          # Page de demande de devis
├── components/                   # Composants React réutilisables
│   ├── ui/                       # Composants UI (Shadcn)
│   └── TestimonialsSection.tsx   # Section témoignages dynamique
├── hooks/                        # Hooks React personnalisés
│   ├── useTestimonials.ts        # Gestion des témoignages
│   ├── useServices.ts            # Gestion des services
│   ├── useProjects.ts            # Gestion des projets
│   ├── useAbout.ts               # Gestion des sections "à propos"
│   └── useContacts.ts            # Gestion des contacts
├── backend/                      # Backend PHP
│   ├── api/                      # Endpoints API
│   │   ├── testimonials.php      # API témoignages
│   │   ├── services.php          # API services
│   │   ├── projects.php          # API projets
│   │   ├── about.php             # API sections "à propos"
│   │   └── contacts.php          # API contacts
│   ├── config/                   # Configuration
│   │   └── database.php          # Connexion MySQL
│   ├── includes/                 # Fichiers utilitaires
│   │   └── cors.php              # Configuration CORS
│   └── database/                 # Scripts SQL
│       ├── comprogn_schema.sql   # Schéma de la base
│       └── insert_services_data.sql # Données d'exemple
├── public/                       # Assets statiques
├── styles/                       # Styles CSS
└── lib/                          # Utilitaires et configurations
```

## 🗃️ Base de Données

### Tables principales

- **`users`** : Utilisateurs et administrateurs
- **`contacts`** : Demandes de contact et devis
- **`services`** : Services offerts par Com'Pro Guinée
- **`projets`** : Portfolio des réalisations
- **`temoignages`** : Témoignages clients
- **`about`** : Sections "À propos" de l'entreprise

## 🔌 APIs Disponibles

### Endpoints principaux

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/testimonials.php` | GET, POST | Gestion des témoignages |
| `/api/services.php` | GET | Récupération des services |
| `/api/projects.php` | GET | Récupération des projets |
| `/api/about.php` | GET | Sections "à propos" |
| `/api/contacts.php` | GET, POST | Gestion des contacts |

### Exemple d'utilisation

```javascript
// Récupérer tous les témoignages
const response = await fetch('http://localhost/backend/api/testimonials.php');
const data = await response.json();

// Ajouter un nouveau contact
const contact = {
  nom: "John Doe",
  email: "john@example.com",
  message: "Demande d'information"
};

const response = await fetch('http://localhost/backend/api/contacts.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(contact)
});
```

## 🎨 Fonctionnalités

### ✅ Implémentées

- **Page d'accueil** avec témoignages dynamiques
- **Page des témoignages** complète avec données de la base
- **Page des services** avec informations dynamiques
- **Gestion d'erreurs** et états de chargement
- **Design responsive** et moderne
- **APIs RESTful** sécurisées
- **Validation des données** côté backend

### 🚧 En développement

- **Page des réalisations** dynamique
- **Page "à propos"** avec contenu de la base
- **Formulaires de contact** fonctionnels
- **Interface d'administration**
- **Système d'authentification**
- **Upload d'images**

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement

# Production
npm run build        # Construire l'application
npm run start        # Démarrer en mode production

# Qualité de code
npm run lint         # Vérifier le code avec ESLint
```

## 🔧 Dépannage

### Erreur "Failed to fetch"

1. Vérifier que XAMPP (Apache + MySQL) est démarré
2. Confirmer que les fichiers PHP sont dans `C:\xampp\htdocs\backend\`
3. Tester l'API directement : `http://localhost/backend/api/testimonials.php`
4. Vérifier la console du navigateur (F12) pour plus de détails

### Base de données vide

1. Importer le schéma : `backend/database/comprogn_schema.sql`
2. Ajouter des données : `backend/database/insert_services_data.sql`
3. Vérifier les connexions dans `backend/config/database.php`

## 📚 Documentation

- **Guide complet** : Voir `zzz.md` pour la documentation détaillée
- **Architecture** : Diagrammes et explications techniques
- **Déploiement** : Instructions de mise en production

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développement Full-Stack** : [Votre nom]
- **Design UI/UX** : [Designer]
- **Gestion de projet** : [Chef de projet]

## 📞 Contact

- **Site web** : [https://compro-guinee.com](https://compro-guinee.com)
- **Email** : contact@compro-guinee.com
- **Téléphone** : +224 XXX XXX XXX

---

**🎉 Développé avec ❤️ pour Com'Pro Guinée - Votre partenaire en communication digitale**
