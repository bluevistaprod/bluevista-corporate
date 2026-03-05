# Blue Vista Productions - Todo List

## Architecture & Infrastructure
- [x] Configurer système i18n multilingue (FR/EN) avec routing et traductions
- [x] Créer schéma base de données (projets, témoignages, actualités, chiffres clés, contacts)
- [x] Implémenter gestion multi-domaines (bluevista.com vs bluevista.ch)
- [ ] Configurer système de fichiers statiques (CDN pour images/vidéos)
- [ ] Mettre en place logging et monitoring

## Pages Principales
- [x] Page d'accueil avec tous les éléments du wireframe
  - [x] Header avec navigation
  - [ ] Hero avec showreel vidéo
  - [x] Section 3 piliers
  - [x] Chiffres clés
  - [x] Témoignages clients en carrousel
  - [x] Dernières réalisations
  - [ ] CTA devis et newsletter
  - [x] Footer
- [x] Page Communication & Marketing
- [x] Page Événementiel
- [x] Page Immersion
- [x] Page Portfolio/Réalisations avec filtres
- [x] Page À Propos (équipe, philosophie, implantations)
- [x] Page Contact et Devis

## CMS & Administration
- [ ] Interface d'administration pour gérer projets
- [ ] Interface d'administration pour gérer témoignages
- [ ] Interface d'administration pour gérer actualités
- [ ] Interface d'administration pour gérer chiffres clés
- [ ] Interface d'administration pour gérer contenus par domaine

## SEO & Performance
- [x] Balises meta dynamiques par page (utilitaires créés)
- [x] Sitemap.xml (procédure tRPC implémentée)
- [x] Schema.org markup (Organisation, Services, LocalBusiness)
- [x] URLs sémantiques
- [ ] Lazy loading images/vidéos
- [ ] Code splitting par route
- [ ] Compression assets
- [ ] Optimisation Core Web Vitals

## Formulaires
- [x] Formulaire de contact avec validation
- [x] Formulaire de devis rapide (intégré au formulaire de contact)
- [x] Inscription newsletter (procédure tRPC implémentée)
- [x] Gestion des soumissions (stockage en base de données)

## Testes & Déploiement
- [ ] Tests unitaires (vitest)
- [ ] Tests d'intégration
- [ ] Vérification SEO
- [ ] Optimisation performances
- [ ] Déploiement et configuration domaines


## Contenu Visuel
- [x] Extraire images du site actuel
- [ ] Extraire vidéos du site actuel
- [x] Uploader visuels sur CDN
- [x] Intégrer images dans pages (accueil, portfolio, témoignages)
- [ ] Intégrer vidéos (showreel, témoignages)
- [ ] Optimiser images (lazy loading, compression)

## Bugs & Corrections
- [x] Corriger erreur de balises <a> imbriquées dans Home.tsx

## Intégration Vidéos Vimeo
- [x] Extraire URLs Vimeo du site actuel
- [x] Ajouter vidéos aux projets du portfolio
- [x] Ajouter vidéos aux témoignages clients
- [x] Créer composant lecteur vidéo responsive
- [x] Ajouter showreel vidéo à la page d'accueil


## Bugs à Corriger
- [x] Afficher les vidéos dans la page Portfolio/Réalisations
- [x] Identifier et supprimer les sections dupliquées sur la page d'accueil (métriques dupliquées en base de données - supprimées)
