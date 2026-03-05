# Blue Vista Productions - Site Web Professionnel

Site web moderne et performant pour Blue Vista Productions, agence de communication, événementiel et immersion.

## 🎯 Caractéristiques Principales

### Architecture Multilingue
- **Langues supportées** : Français (FR) et Anglais (EN)
- **Gestion multi-domaines** : bluevista.com (France) et bluevista.ch (Suisse)
- **Système i18n** : Traductions centralisées dans `shared/i18n.ts`
- **Détection automatique** : Langue basée sur URL, localStorage ou préférence navigateur

### Pages Principales
1. **Accueil** (`/`) - Hero, 3 piliers, témoignages, réalisations, CTA
2. **À Propos** (`/agency`) - Philosophie, équipe, implantations (Lyon, Paris, Genève)
3. **Offres** (`/offers/:type`) - Pages détaillées pour Communication, Événementiel, Immersion
4. **Portfolio** (`/portfolio`) - Réalisations avec filtres par secteur
5. **Contact** (`/contact`) - Formulaire de contact et devis

### 3 Piliers Stratégiques
1. **Communication & Marketing** - Visibilité en ligne, snack content, RS, podcasts
2. **Événementiel** - Conception, scénographie, streaming, diffusion multi-canaux
3. **Immersion** - VR/AR, showroom virtuel, salle immersive, expériences innovantes

### Base de Données
Tables principales :
- `users` - Gestion des utilisateurs et authentification
- `projects` - Portfolio et réalisations
- `testimonials` - Témoignages clients
- `metrics` - Chiffres clés et statistiques
- `contact_submissions` - Formulaires de contact
- `newsletter_subscriptions` - Abonnés newsletter

### SEO Optimisé
- ✅ Balises meta dynamiques par page
- ✅ Sitemap XML généré dynamiquement
- ✅ Schema.org markup (Organisation, Services, LocalBusiness)
- ✅ URLs sémantiques
- ✅ Robots.txt configuré
- ✅ Manifest.json pour PWA

### Formulaires & Interactions
- Formulaire de contact avec validation côté client et serveur
- Formulaire de devis intégré
- Inscription newsletter
- Tous les formulaires stockent les données en base de données

## 🛠️ Stack Technique

- **Frontend** : React 19 + Vite + Tailwind CSS 4
- **Backend** : Express 4 + tRPC 11
- **Base de données** : MySQL/TiDB avec Drizzle ORM
- **Authentification** : Manus OAuth
- **Tests** : Vitest
- **Déploiement** : Manus Platform

## 📁 Structure du Projet

```
bluevista-prod/
├── client/
│   ├── src/
│   │   ├── pages/          # Pages principales
│   │   ├── components/     # Composants réutilisables
│   │   ├── hooks/          # Hooks personnalisés (useI18n)
│   │   ├── lib/            # Configuration tRPC
│   │   └── App.tsx         # Routage principal
│   ├── public/             # Fichiers statiques (robots.txt, manifest.json)
│   └── index.html
├── server/
│   ├── routers.ts          # Procédures tRPC
│   ├── db.ts               # Requêtes base de données
│   ├── sitemap.ts          # Génération sitemap XML
│   └── *.test.ts           # Tests unitaires
├── drizzle/
│   └── schema.ts           # Schéma base de données
├── shared/
│   ├── i18n.ts             # Système de traductions
│   ├── seo.ts              # Utilitaires SEO
│   └── const.ts            # Constantes globales
└── todo.md                 # Suivi des tâches
```

## 🚀 Démarrage

### Installation
```bash
cd /home/ubuntu/bluevista-prod
pnpm install
```

### Développement
```bash
pnpm dev
# Accédez à https://3000-ilv4otibrgemlvf5k45lt-f45200a7.us1.manus.computer
```

### Tests
```bash
pnpm test
```

### Build
```bash
pnpm build
pnpm start
```

## 📊 Procédures tRPC Disponibles

### Portfolio
- `portfolio.getAll()` - Tous les projets
- `portfolio.getFeatured()` - Projets en vedette
- `portfolio.getBySector()` - Projets par secteur
- `portfolio.create()` - Créer un projet (admin)

### Témoignages
- `testimonials.getAll()` - Tous les témoignages
- `testimonials.getFeatured()` - Témoignages en vedette
- `testimonials.create()` - Créer un témoignage (admin)

### Métriques
- `metrics.getAll()` - Tous les chiffres clés
- `metrics.create()` - Créer une métrique (admin)

### Contact
- `contact.submit()` - Soumettre un formulaire de contact
- `contact.getAll()` - Récupérer les soumissions (admin)

### Newsletter
- `newsletter.subscribe()` - S'abonner à la newsletter

### Sitemap
- `sitemap.get()` - Générer le sitemap XML

## 🎨 Personnalisation

### Traductions
Éditer `shared/i18n.ts` pour ajouter/modifier les traductions.

### Couleurs & Styles
- Tailwind CSS 4 configuré dans `client/src/index.css`
- Couleurs principales : Bleu (#2563eb), Violet, Rose
- Composants shadcn/ui pour cohérence

### Domaines
- `bluevista.com` (France) - domaine "com"
- `bluevista.ch` (Suisse) - domaine "ch"
- Chaque domaine peut avoir du contenu distinct via le champ `domain` en base de données

## 📝 Variables d'Environnement

Automatiquement injectées par Manus :
- `DATABASE_URL` - Connexion MySQL
- `JWT_SECRET` - Secret de session
- `VITE_APP_ID` - ID application OAuth
- `OAUTH_SERVER_URL` - URL serveur OAuth
- `VITE_OAUTH_PORTAL_URL` - URL portail OAuth

## 🔐 Authentification

- Utilisateurs publics : Accès à toutes les pages publiques
- Utilisateurs connectés : Accès aux fonctionnalités supplémentaires
- Administrateurs : Gestion du contenu (projets, témoignages, métriques)

## 📈 Prochaines Étapes

- [ ] Intégrer vidéos showreel
- [ ] Ajouter blog/actualités
- [ ] Implémenter CMS d'administration complet
- [ ] Optimiser images (lazy loading, compression)
- [ ] Ajouter analytics
- [ ] Configurer domaines personnalisés
- [ ] Mettre en place notifications email

## 📞 Support

Pour toute question ou modification, consultez le fichier `todo.md` pour suivre l'avancement du projet.
