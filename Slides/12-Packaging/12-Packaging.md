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

# 5. Ajouter une icône (important !)

Chaque OS a un format spécifique :

| OS      | Format  |
| ------- | ------- |
| Windows | `.ico`  |
| macOS   | `.icns` |
| Linux   | `.png`  |

Tu places tes icônes dans `assets/` puis tu ajustes :

```json
"win": { "icon": "assets/icon.ico" }
```

---

# 6. Packaging + React (ou Webpack / Vite)

Si ton front est compilé (React), pense à :

1. **builder le front** :

```bash
npm run build:ui
```

2. mettre l’output dans `build.files` :

```json
"files": [
  "build/**/*",
  "main.js",
  "preload.js"
]
```

---

# 7. Gestion des variables d’environnement

Pour distinguer packagé / dev :

```js
if (app.isPackaged) {
  console.log("App packagée");
} else {
  console.log("Mode développement");
}
```

---

