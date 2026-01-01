# App Géotraqueur Étudiant

Application mobile de géolocalisation et photos géolocalisées développée avec Ionic/Capacitor pour Android.

## Description

Cette application permet de tracker les positions GPS d'un étudiant et d'associer des photos à ces positions. Idéal pour documenter la présence en cours, bibliothèque, stage, etc.

## Fonctionnalités

- Position GPS en temps réel
- Suivi continu de la position
- Prise de photos géolocalisées
- Catégorisation des lieux (Cours, Bibliothèque, Stage, Autre)
- Historique des positions avec photos
- Statistiques par catégorie

## Technologies utilisées

- Ionic Framework 8
- Angular 17
- Capacitor 6
- TypeScript
- Plugin Geolocation
- Plugin Camera

## Installation

```bash
# Cloner le projet
git clone https://github.com/ayoubm11/App-Geotraqueur.git
cd App-Geotraqueur

# Installer les dépendances
npm install

# Build l'application
ionic build

# Synchroniser avec Capacitor
npx cap sync
```

## Lancer l'application

### Mode développement (navigateur)
```bash
ionic serve
```

### Sur Android
```bash
# Ouvrir dans Android Studio
npx cap open android

# Ou générer l'APK
cd android
gradlew assembleDebug
```

L'APK se trouve dans : `android/app/build/outputs/apk/debug/app-debug.apk`

## Permissions requises

- ACCESS_FINE_LOCATION : Géolocalisation précise
- ACCESS_COARSE_LOCATION : Géolocalisation approximative
- CAMERA : Accès à la caméra

## Structure du projet

```
src/
├── app/
│   ├── tab1/
│   │   ├── tab1.page.ts      # Logique principale
│   │   ├── tab1.page.html    # Interface
│   │   └── tab1.page.scss    # Styles
│   └── tabs/
│       └── tabs-routing.module.ts
└── android/                   # Projet Android natif
```

## Auteur

**Ayoub MOURADI**  

---

**Développé avec** Ionic Framework
