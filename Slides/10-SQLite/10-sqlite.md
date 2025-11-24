# Application Electron + SQLite : Liste de courses

Voici une application minimale utilisant **Electron**, **SQLite3** et un front simple en HTML/JS.

---

## 📁 Structure du projet

```
shopping-app/
├── package.json
├── main.js
├── db.js
├── renderer.js
└── index.html
```

---

## 📦 package.json

```json
{
  "name": "shopping-list-app",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "dependencies": {
    "electron": "latest",
    "sqlite3": "latest"
  }
}
```

---

## 🧠 db.js (Gestion SQLite)

```js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'shopping.db'));

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`
  );
});

module.exports = {
  getAll(callback) {
    db.all("SELECT * FROM products", [], (err, rows) => {
      callback(err, rows);
    });
  },
  add(name, callback) {
    db.run("INSERT INTO products (name) VALUES (?)", [name], function (err) {
      callback(err, this.lastID);
    });
  },
  remove(id, callback) {
    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
      callback(err);
    });
  }
};
```

---

## ⚡ main.js (Processus principal Electron)

```js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db');

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

app.whenReady().then(createWindow);

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

---

## 🌐 renderer.js (Communication Front ↔ Electron)

```js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getProducts: () => ipcRenderer.invoke('get-products'),
  addProduct: (name) => ipcRenderer.invoke('add-product', name),
  deleteProduct: (id) => ipcRenderer.invoke('delete-product', id)
});
```

---

## 🖥️ index.html (Interface simple)

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
