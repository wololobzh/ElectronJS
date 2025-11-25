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
  "name": "app-electron-demo",
  "version": "1.0.0",
  "main": "main.js",
  "build": {
    "appId": "com.demo.app",
    "productName": "DemoApp",
    "directories": {
      "output": "dist"
    },
    "files": [
      "dist/**/*",
      "main.js",
      "preload.js",
      "package.json"
    ],
    "win": {
      "target": "nsis",
      "icon": "assets/icon.ico"
    },
    "mac": {
      "target": "dmg",
      "icon": "assets/icon.icns"
    },
    "linux": {
      "target": "AppImage",
      "icon": "assets/icon.png"
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

# 8. Erreurs fréquentes (à montrer aux étudiants)

### ❌ “Cannot find module”

→ Mauvais chemin dans `"files"`.

### ❌ L’écran reste blanc

→ Le chemin vers ton `index.html` change en mode packagé :

```js
mainWindow.loadURL(`file://${path.join(__dirname, 'dist/index.html')}`);
```

### ❌ La build mac ne fonctionne pas sous Windows

→ On ne peut **pas** builder macOS sur Windows (Apple SDK requis).

---

# 9. Mini-TP (20 minutes)

### 🎯 Objectif :

Packager l’application fil rouge avec une icône personnalisée.

### Tâches :

1. Ajouter les scripts build dans `package.json`
2. Créer un fichier `electron-builder.yml` ou partie `"build"`
3. Ajouter une icône (format selon l’OS)
4. Lancer la commande :

```bash
npm run build
```

5. Vérifier que l’installateur fonctionne.

🎓 **Livrable :**
Un `.exe` ou `.dmg` avec le nom du projet + icône custom.