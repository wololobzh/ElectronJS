# DemonstrationElectronViteReact

Démonstration développement Desktop avec **Electron + Vite + React**

---

# Étape 1 : Installer Node.js et npm

Téléchargez Node.js (version LTS recommandée) depuis le site officiel.
[https://nodejs.org/](https://nodejs.org/)

---

# Étape 2 : Vérifiez l'installation

```bash
node -v
npm -v
```

---

# Étape 3 : Créer un projet Vite + React

On va créer une interface moderne grâce à **Vite** et **React**.

```bash
npm create vite@latest electron-vite-react --template react
cd electron-vite-react
npm install
```

Cela génère un projet React minimal, prêt à être utilisé comme front-end pour Electron.

---

# Étape 4 : Installer Electron

```bash
npm install electron --save-dev
```

---

# Étape 5 : Mettre à jour le `.gitignore`

```
node_modules
dist
.vite
```

---

# Étape 6 : Créer la structure Electron

À la racine du projet, crée un fichier `electron/main.js`.

## electron/main.js

```js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // En dev : charger Vite
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } 
  // En build : charger index.html compilé
  else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

---

# Étape 7 : Ajouter le preload (sécurisé)

## electron/preload.js

```js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  ping: () => "pong depuis Electron"
});
```

Le preload sert d’interface sécurisée pour communiquer entre React (renderer) et Electron (main process).

---

# Étape 8 : Modifier package.json pour ajouter un script Electron

Dans `package.json`, ajoute :

```json
{
  "main": "electron/main.js",
  "scripts": {
    "dev": "concurrently -k \"vite\" \"wait-on http://localhost:5173 && electron .\"",
    "build": "vite build",
    "electron": "electron ."
  },
  "devDependencies": {
    "concurrently": "^8.2.0",
    "wait-on": "^7.2.0"
  }
}
```

Installer les outils nécessaires :

```bash
npm install concurrently wait-on --save-dev
```

---

# Étape 9 : Appeler l’API Electron dans React

Ouvre `src/App.jsx` et modifie-le ainsi :

```jsx
function App() {
  return (
    <div>
      <h1>Electron + Vite + React</h1>
      <p>Message du preload : {window.api.ping()}</p>
    </div>
  );
}

export default App;
```

---

# Étape 10 : Lancer l’application

```bash
npm run dev
```

Cela :

* lance Vite (frontend React)
* attend qu’il soit prêt
* lance Electron en pointant vers le serveur Vite

**Tu obtiens une app Electron moderne, ultra rapide, avec React !**

---

# Partie Bonus : Exemple complet d’une appli Electron avec React – Jeu de la Fourchette

Voici un petit jeu adapté au setup Vite/React/Electron.

---

## 1. main.js

```js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let secretNumber = Math.floor(Math.random() * 100) + 1;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 350,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

ipcMain.on('guess', (event, number) => {
  let result;

  if (number < secretNumber) result = "Trop petit !";
  else if (number > secretNumber) result = "Trop grand !";
  else {
    result = "Bravo !";
    secretNumber = Math.floor(Math.random() * 100) + 1;
  }

  event.reply('result', result);
});

app.whenReady().then(createWindow);
```

---

## 2. preload.js

```js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('gameApi', {
  guess: (n) => ipcRenderer.send('guess', n),
  onResult: (cb) => ipcRenderer.on('result', (event, msg) => cb(msg))
});
```

---

## 3. React (src/App.jsx)

```jsx
import { useState } from "react";

export default function App() {
  const [result, setResult] = useState("");

  const sendGuess = () => {
    const value = parseInt(document.getElementById("input").value);
    if (isNaN(value)) return setResult("Entrez un nombre !");
    window.gameApi.guess(value);
  };

  window.gameApi.onResult((msg) => setResult(msg));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Jeu de la Fourchette</h1>
      <input id="input" type="number" />
      <button onClick={sendGuess}>Valider</button>
      <p>{result}</p>
    </div>
  );
}
```
