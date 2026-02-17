# Projet Fil Rouge - Catalogue de Films

Application web React permettant de parcourir des catalogues de films de différentes sagas (Marvel, Hunger Games, Star Wars), avec système d'authentification et fonctionnalités sociales.

## Fonctionnalités

- **Authentification** : Inscription, connexion et déconnexion via Firebase Auth
- **Catalogue de films** : Parcourir les films par saga (Marvel, Hunger Games, Star Wars)
- **Détails des films** : Page détaillée avec synopsis, réalisateur, date de sortie
- **Favoris** : Ajouter/retirer des films en favoris (stockés dans Firestore)
- **Commentaires** : Système de commentaires avec création et suppression
- **Likes** : Liker les commentaires des autres utilisateurs
- **Recherche** : Barre de recherche dynamique avec résultats en temps réel
- **Profil utilisateur** : Voir ses films favoris
- **Responsive** : Interface adaptée mobile et desktop

## Technologies

- **React 19** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Firebase** - Auth + Firestore
- **React Router DOM 7** - Navigation
- **Zustand** - State management

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd Projet-fil-rouge-React

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env à la racine avec :
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain

# Lancer le serveur de développement
npm run dev
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Compile le projet pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie le code avec ESLint |

## Structure du projet

```
src/
├── assets/          # Images et ressources statiques
├── components/      # Composants réutilisables
│   ├── Avatar.tsx
│   ├── CardComment.tsx
│   ├── CardLogin.tsx
│   ├── CardMovie.tsx
│   ├── CreateComment.tsx
│   ├── Header.tsx
│   ├── ListComments.tsx
│   ├── ListMovie.tsx
│   └── SearchBar.tsx
├── config/          # Configuration (sagas, posters)
│   ├── moviePosters.ts
│   └── sagas.ts
├── pages/           # Pages de l'application
│   ├── Auth.tsx
│   ├── Home.tsx
│   ├── Movie.tsx
│   └── Profil.tsx
├── stores/          # Stores Zustand
├── firebase.ts      # Configuration et fonctions Firebase
├── main.tsx         # Point d'entrée
└── index.css        # Styles globaux
```

## Base de données Firestore

### Collections

- **movies** : Liste des films avec titre, réalisateur, année, saga, image
- **users** : Profils utilisateurs avec email et favoris
- **comments** : Commentaires avec movieId, userId, texte, likes

## Auteur

Projet réalisé dans le cadre du module Développement Web Front-End.
