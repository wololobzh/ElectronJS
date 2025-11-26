# Tests & Debugging dans Electron

## 1. Comprendre les 3 niveaux de debugging dans Electron

Electron combine **3 environnements différents**, chacun ayant ses outils de debugging :

| Contexte             | Description                          | Outils de debug                                  |
| -------------------- | ------------------------------------ | ------------------------------------------------ |
| **Main process**     | Le cœur de l’app (Node.js)           | console.log(), DevTools “Main” |
| **Renderer process** | L’UI (comme un navigateur)           | Chrome DevTools                  |
| **Preload**          | Pont sécurisé entre main et renderer | Logging ciblé               |

Comprendre **où un bug se produit** avant de chercher *comment* le corriger

---

## 2. Debug du Renderer (UI)

### Ouvrir les DevTools du Renderer

```js
mainWindow.webContents.openDevTools();
```

## 3. Debug du Main Process (Node.js)

### Ajouter des `console.log()` stratégiques

```js
console.log("[main] fonction appelée avec la valeur : ",saisie);
```

## 4. Debug du Preload

### Ajouter des `console.log()` stratégiques

```js
console.log("[preload] api exposée : ", Object.keys(api));
```

---

## 5. Tester la communication IPC (Main ↔ Preload ↔ Renderer)

**Astuce pratique : loguer depuis les 3 couches**

```js
// main.js
ipcMain.handle("get-version", () => {
  console.log("[main] get-version appelé");
  return app.getVersion();
});
```

```js
// preload.js
contextBridge.exposeInMainWorld("api", {
  getVersion: () => {
    console.log("[preload] appel getVersion");
    return ipcRenderer.invoke("get-version");
  }
});
```

```js
// rendu.js
api.getVersion().then(v => {
  console.log("[renderer] version reçue :", v);
});
```

---

## 6. Tests automatisés avec Jest

---

### Installation

```bash
npm install jest
```

### Execution des test

Ajouter ce script dans package.json : 

```js
"test":"jest"
```

---

### Execution des tests

Dans un dossier test:

```
shopping-app/
├── package.json
├── main.js
├── db.js
├── renderer.js
└── index.html
└── test
    └── renderer.test.js
    └── main.test.js
    └── db.test.js
```

---

### db.js

```js
// --------------------------------------------------------------
// Import natif de Node.js permettant de manipuler les chemins
// de fichiers et dossiers de manière indépendante du système
// (Windows, Linux, macOS).
// --------------------------------------------------------------
const path = require('path');


// Variable qui contiendra l’instance du module sqlite3.
// Elle n’est pas encore définie car le chemin du module dépend
// de si on est en mode développeur ou en version packagée.
let sqlite3 = null;


// --------------------------------------------------------------
// CE BLOC DÉTERMINE COMMENT CHARGER SQLITE3
// --------------------------------------------------------------
// Si la variable d'environnement MODE vaut "dev", c'est qu'on est
// en mode développement. Dans ce cas, on charge sqlite3 depuis
// node_modules normalement.
// Cela permet de travailler facilement avec `npm install sqlite3`.
// --------------------------------------------------------------
if ((process.env.MODE || "").trim() === "dev") {
  sqlite3 = require('sqlite3').verbose();

} else {

  // ------------------------------------------------------------
  // Sinon (donc en mode production packagé dans Electron)
  // sqlite3 ne peut PAS être chargé depuis node_modules classique,
  // car ils sont encapsulés dans app.asar.
  //
  // On force donc le chargement du module sqlite3 depuis :
  //   process.resourcesPath/app.asar/node_modules/sqlite3
  //
  // process.resourcesPath pointe vers :
  //   - Sur Windows : C:\Program Files\MonApp\resources
  //   - Sur macOS : /Applications/MonApp.app/Contents/Resources
  //
  // Ce chemin existe seulement en mode Electron packagé.
  // ------------------------------------------------------------
  const sqlite3Path = path.join(process.resourcesPath, 'app.asar', 'node_modules', 'sqlite3');

  // Charge sqlite3 depuis ce chemin spécifique (dépackagé automatiquement)
  sqlite3 = require(sqlite3Path).verbose();
}

//📦 Pourquoi Electron utilise ASAR ?
//Parce que :
//Tout le code de l'app est regroupé en un seul fichier
// plus facile à distribuer
// répertoires plus propres
// Plus difficile d’aller modifier le code
// un utilisateur lambda ne peut pas éditer les fichiers de l'app aussi facilement
// Chargement plus rapide
// l'archive est lue en mémoire comme un seul bloc


// --------------------------------------------------------------
// CHOIX DE LA BASE PATH
// --------------------------------------------------------------
// process.resourcesPath existe seulement dans Electron packagé.
// Si c'est le cas → on utilise ce chemin.
// Sinon → on est probablement dans Jest ou Node simple, donc on
// utilise __dirname (chemin du fichier courant).
// --------------------------------------------------------------
if (process.resourcesPath) {
  // Chemin de base des fichiers embarqués dans l’application packagée
  basePath = process.resourcesPath;
} else {
  // Environnement de test ou exécution directe avec Node
  basePath = __dirname;
}


// --------------------------------------------------------------
// Définition du chemin complet vers la base SQLite.
// La base sera stockée à la racine du dossier correspondant
// (resources en production, ou dossier du script en dev).
// --------------------------------------------------------------
const dbFile = path.join(basePath, 'shopping.db');


// --------------------------------------------------------------
// Ouverture / création de la base SQLite.
// Si le fichier n'existe pas, SQLite le crée automatiquement.
// --------------------------------------------------------------
const db = new sqlite3.Database(dbFile);


// --------------------------------------------------------------
// Initialisation de la base : création de la table "products"
// si elle n'existe pas déjà.
// serialize() garantit que les commandes seront exécutées
// dans l’ordre.
// --------------------------------------------------------------
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,   -- identifiant auto-incrémenté
      name TEXT NOT NULL                      -- nom du produit, obligatoire
    )
  `);
});


// --------------------------------------------------------------
// EXPORT DU MODULE
// --------------------------------------------------------------
// On expose ici plusieurs méthodes pour interagir avec la base :
//   - getAll()  → récupérer tous les produits
//   - add()     → ajouter un produit
//   - remove()  → supprimer un produit par ID
// --------------------------------------------------------------
module.exports = {

  // ------------------------------------------------------------
  // Récupère tous les produits dans la base.
  // db.all() renvoie un tableau d’objets représentant les lignes.
  // callback(err, results)
  // ------------------------------------------------------------
  getAll(callback) {
    db.all("SELECT * FROM products", [], callback);
  },

  // ------------------------------------------------------------
  // Ajoute un produit.
  // db.run() exécute une requête sans résultat direct.
  // "this.lastID" contient l'ID généré automatiquement.
  // ------------------------------------------------------------
  add(name, callback) {
    db.run(
      "INSERT INTO products (name) VALUES (?)",
      [name],
      function (err) {        // function() pour accéder à this.lastID
        callback(err, this.lastID);
      }
    );
  },

  // ------------------------------------------------------------
  // Supprime un produit selon son ID.
  // La callback est appelée une fois la suppression effectuée.
  // ------------------------------------------------------------
  remove(id, callback) {
    db.run("DELETE FROM products WHERE id = ?", [id], callback);
  }
};
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Liste de courses</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    ul { padding: 0; }
    li { list-style: none; padding: 5px; display: flex; justify-content: space-between; }
    button { margin-left: 10px; }
  </style>
</head>
<body>
  <h1>Liste de courses</h1>
  <input id="productInput" placeholder="Ajouter un produit" />
  <button id="addButton">Ajouter</button>

  <ul id="productList"></ul>

  <script>
    async function refresh() {
      const list = document.getElementById('productList');
      list.innerHTML = '';
      const products = await window.api.getProducts();

      products.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p.name;

        const del = document.createElement('button');
        del.textContent = '❌';
        del.onclick = async () => {
          await window.api.deleteProduct(p.id);
          refresh();
        };

        li.appendChild(del);
        list.appendChild(li);
      });
    }

    document.getElementById('addButton').onclick = async () => {
      const name = document.getElementById('productInput').value;
      if (name.trim() !== '') {
        await window.api.addProduct(name);
        document.getElementById('productInput').value = '';
        refresh();
      }
    };

    refresh();
  </script>
</body>
</html>
```

### main.js

```js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// -------------------------------------------------------------
// 🔥 Fonction pour résoudre correctement le chemin vers db.js
// -------------------------------------------------------------
function resolveDbPath() {
  // Chemin dev (lancer avec `npm start`)
  const devPath = path.join(__dirname, 'db.js');
  if (fs.existsSync(devPath)) {
    return devPath;
  }

  // Chemin prod (après build)
  return path.join(process.resourcesPath, 'db.js');
}

// Charge la base SQLite (fonctionne en dev + build)
const db = require(resolveDbPath());


// -------------------------------------------------------------
// 🔥 Création de la fenêtre principale
// -------------------------------------------------------------
function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});


// -------------------------------------------------------------
// 🔥 Handlers IPC (Renderer -> Main)
// -------------------------------------------------------------

ipcMain.handle('get-products', () => {
  return new Promise((resolve, reject) => {
    db.getAll((err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

ipcMain.handle('add-product', (event, name) => {
  return new Promise((resolve, reject) => {
    db.add(name, (err, id) => {
      if (err) reject(err);
      else resolve({ id, name });
    });
  });
});

ipcMain.handle('delete-product', (event, id) => {
  return new Promise((resolve, reject) => {
    db.remove(id, (err) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
});
```

### renderer.js

```js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getProducts: () => ipcRenderer.invoke('get-products'),
  addProduct: (name) => ipcRenderer.invoke('add-product', name),
  deleteProduct: (id) => ipcRenderer.invoke('delete-product', id)
});
```

---

### package.json

```json
{
  "name": "demoavecsqlite3",
  "version": "1.0.0",
  "description": "Demo Electron + SQLite3",
  "main": "main.js",
  "scripts": {
    "start": "set MODE=dev && electron .",
    "test": "set MODE=dev && jest",
  },
  "dependencies": {
    "sqlite3": "^5.1.7"
  },
  "devDependencies": {
    "electron": "^39.2.3",
    "jest": "^30.2.0"
  },
}
```

---

### db.test.js

```js
jest.mock("sqlite3", () => ({
  verbose: () => ({
    Database: jest.fn().mockImplementation(() => {
      return {
        serialize: (fn) => fn(),
        run: jest.fn((query, params, cb) => cb && cb.call({ lastID: 1 }, null)),
        all: jest.fn((query, params, cb) => cb(null, [{ id: 1, name: "Pommes" }]))
      };
    })
  })
}));

const db = require("../db");

describe("DB Tests", () => {

  test("add() insère un produit", (done) => {
    db.add("Pommes", (err, id) => {
      expect(err).toBeNull();
      expect(id).toBe(1);
      done();
    });
  });

  test("getAll() renvoie les produits", (done) => {
    db.getAll((err, rows) => {
      expect(err).toBeNull();
      expect(rows).toEqual([{ id: 1, name: "Pommes" }]);
      done();
    });
  });

  test("remove() supprime un produit", (done) => {
    db.remove(1, (err) => {
      expect(err).toBeNull();
      done();
    });
  });

});
```

---

### main.test.js

```js
jest.mock('../db', () => ({
  getAll: jest.fn(),
  add: jest.fn(),
  remove: jest.fn()
}));

// Mock Electron
jest.mock('electron', () => {
  return {
    ipcMain: {
      handle: jest.fn()
    },
    BrowserWindow: jest.fn().mockImplementation(() => ({
      loadFile: jest.fn()
    })),
    app: {
      whenReady: () => ({ then: (fn) => fn() })
    }
  };
});

const db = require('../db');
require('../main'); // charge et exécute les handlers IPC

describe("IPC Handlers", () => {

  test("get-products renvoie la liste", async () => {
    const mockRows = [{ id: 1, name: "Lait" }];
    db.getAll.mockImplementation((cb) => cb(null, mockRows));

    const handler = require("electron").ipcMain.handle.mock.calls.find(
      c => c[0] === "get-products"
    )[1];

    const result = await handler();

    expect(result).toEqual(mockRows);
  });

  test("add-product renvoie l'objet ajouté", async () => {
    db.add.mockImplementation((name, cb) => cb(null, 42));

    const handler = require("electron").ipcMain.handle.mock.calls.find(
      c => c[0] === "add-product"
    )[1];

    const result = await handler(null, "Bananes");

    expect(result).toEqual({ id: 42, name: "Bananes" });
  });

  test("delete-product renvoie true", async () => {
    db.remove.mockImplementation((id, cb) => cb(null));

    const handler = require("electron").ipcMain.handle.mock.calls.find(
      c => c[0] === "delete-product"
    )[1];

    const result = await handler(null, 123);

    expect(result).toBe(true);
  });

});
```

---

### renderer.test.js

```js
jest.mock("electron", () => ({
  contextBridge: {
    exposeInMainWorld: jest.fn()
  },
  ipcRenderer: {
    invoke: jest.fn()
  }
}));

require("../renderer");

const { contextBridge, ipcRenderer } = require("electron");

describe("Renderer preload", () => {
  test("API exposée correctement", () => {
    expect(contextBridge.exposeInMainWorld).toHaveBeenCalled();

    const args = contextBridge.exposeInMainWorld.mock.calls[0];
    const apiObj = args[1];

    expect(typeof apiObj.getProducts).toBe("function");
    expect(typeof apiObj.addProduct).toBe("function");
    expect(typeof apiObj.deleteProduct).toBe("function");
  });

  test("getProducts utilise ipcRenderer.invoke", async () => {
    ipcRenderer.invoke.mockResolvedValue([{ id: 1 }]);
    const api = contextBridge.exposeInMainWorld.mock.calls[0][1];

    const res = await api.getProducts();
    expect(res).toEqual([{ id: 1 }]);
    expect(ipcRenderer.invoke).toHaveBeenCalledWith("get-products");
  });
});
```
