# Packaging avec Electron Builder

> *Créer une application installable pour Windows, macOS ou Linux.*

---

# 1. Pourquoi Electron Builder ?

Electron Builder permet :

* de packager ton app pour **Win / macOS / Linux**
* de générer des **installateurs** (.exe / .dmg / .deb…)
* de gérer les **icônes**, **auto-update**, **architecture ARM/Intel**, etc.
* d’automatiser la configuration avec un simple fichier `electron-builder.yml` ou `package.json`

C’est le **standard actuel** pour packager Electron

---

# 2. Installation

Ajoute Electron Builder :

```bash
npm install electron-builder
```

---

# 2. Installation

Ajoute les scripts dans ton `package.json` :

```json
{
  "scripts": {
    "build": "electron-builder",
    "build:win": "electron-builder --win",
    "build:mac": "electron-builder --mac",
    "build:linux": "electron-builder --linux"
  }
}
```

`npm run build` → build pour l’OS hôte.

---

# 3. Fichier de configuration (simple et efficace)

Dans `package.json`

Voici la config :

```json
{
  "name": "demoavecsqlite3",
  "version": "1.0.0",
  "description": "Demo Electron + SQLite3",
  "main": "main.js",
  "scripts": {
    "start": "set MODE=dev && electron .",
    "test": "set MODE=dev && jest",
    "build": "electron-builder",
    "build:win": "electron-builder --win"
  },
  "dependencies": {
    "sqlite3": "^5.1.7"
  },
  "devDependencies": {
    "electron": "^39.2.3",
    "electron-builder": "^26.0.12",
    "jest": "^30.2.0"
  },
  "build": {
    "appId": "com.demo.app",
    "productName": "DemoApp",
    "directories": {
      "output": "dist"
    },
    "asar": true,
    "files": [
      "**/*",
      "!dist/**/*",
      "!test/**/*"
    ],
    "win": {
      "target": "nsis",
      "signAndEditExecutable": false,
      "verifyUpdateCodeSignature": false,
      "forceCodeSigning": false
    }
  }
}
```

---

```json
{
  // Nom de ton projet NPM / Electron.
  // Utilisé comme identifiant interne.
  "name": "demoavecsqlite3",

  // Version du projet selon SemVer : MAJOR.MINOR.PATCH
  "version": "1.0.0",

  // Description lisible par les utilisateurs/développeurs.
  "description": "Demo Electron + SQLite3",

  // Fichier principal exécuté par Electron (processus principal).
  "main": "main.js",

  // Scripts NPM pour automatiser les actions courantes.
  "scripts": {
    // Lance l'application en mode développement.
    // MODE=dev permet à ton code de charger sqlite3 depuis node_modules.
    "start": "set MODE=dev && electron .",

    // Lance les tests Jest en mode développeur.
    "test": "set MODE=dev && jest",

    // Génère une application packagée (Windows/Mac/Linux selon OS).
    "build": "electron-builder",

    // Génère EXCLUSIVEMENT une version Windows (installeur .exe).
    "build:win": "electron-builder --win"
  },

  // Dépendances nécessaires en production (fournies dans la build Electron).
  "dependencies": {
    // Module SQLite natif utilisé par ton application.
    "sqlite3": "^5.1.7"
  },

  // Dépendances utilisées uniquement en développement :
  // Electron, outil de build, framework de tests.
  "devDependencies": {
    // Framework principal permettant de créer une app desktop JS.
    "electron": "^39.2.3",

    // Outil complet pour packager/signature/installeur Electron.
    "electron-builder": "^26.0.12",

    // Framework pour les tests unitaires.
    "jest": "^30.2.0"
  },

  // Configuration pour electron-builder (packaging).
  "build": {

    // Identifiant unique de l'application (reverse DNS).
    // Utilisé par Windows/macOS pour reconnaître l'app.
    "appId": "com.demo.app",

    // Nom visible de l'application (menu démarrer, installeur…).
    "productName": "DemoApp",

    // Configuration des dossiers de build.
    "directories": {
      // Répertoire où sera généré l'exécutable final.
      "output": "dist"
    },

    // Active la création du fichier app.asar (archive du code).
    "asar": true,

    // Liste des fichiers inclus/exclus dans la build finale.
    "files": [
      // Inclut tous les fichiers du projet.
      "**/*",

      // Exclut le dossier dist (pour éviter d’inclure une ancienne build).
      "!dist/**/*",

      // Exclut le dossier test (les tests ne sont pas inclus dans l'app finale).
      "!test/**/*"
    ],

    // Configuration spécifique pour Windows.
    "win": {
      // Format du packager Windows : NSIS → crée un installeur .exe
      "target": "nsis",

      // Désactive la signature automatique de l'exécutable.
      "signAndEditExecutable": false,

      // Ne vérifie pas la signature du code lors des mises à jour.
      "verifyUpdateCodeSignature": false,

      // Ne force pas la signature (pratique pour les projets perso).
      "forceCodeSigning": false
    }
  }
}
```

---

# 4. Lancer un build

## Pour Windows :

```bash
npm run build:win
```

## Pour macOS :

```bash
npm run build:mac
```

## Pour Linux :

```bash
npm run build:linux
```

### 📂 Résultat :

Dans le dossier `dist/` on obtient :

* un installateur `.exe`, `.dmg`, `.AppImage`
* un dossier portable contenant l'application packagée

---

# 5. Ajouter une icône

Chaque OS a un format spécifique :

| OS      | Format  |
| ------- | ------- |
| Windows | `.ico`  |
| macOS   | `.icns` |
| Linux   | `.png`  |

Placez les icônes dans `assets/` puis ajustez :

```json
"win": { "icon": "assets/icon.ico" }
```

---


