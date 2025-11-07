# 🎉 **TP Jour 3 — Fonctionnalités natives, Sécurité & Tests automatisés**

Voici maintenant ton **TP Jour 3 complet**, incluant :
✅ gestion fichiers & base de données
✅ sécurité (contextBridge, sandbox…)
✅ IPC avancé
✅ amélioration UI
✅ tests unitaires Jest
✅ intégration des tests dans la CI

---

# 🧪 **TP Jour 3 — Noteor se professionnalise**

Bravo pour le travail des deux premiers jours !
Aujourd’hui, votre application va devenir une **vraie application desktop de niveau pro** :

✅ stockage en base de données
✅ module de configuration utilisateur
✅ sécurité renforcée
✅ tests unitaires
✅ CI avec tests automatiques
✅ meilleure gestion IPC

🎯 Objectif final : rendre votre app **robuste, sécurisée et testée**.

---

# ✅ **Étape 1 — Installation d’une base SQLite**

Installer `better-sqlite3` :

```bash
npm install better-sqlite3
```

Créer `db/notes.db`.

Créer un fichier `database.js` dans le dossier `main/` :

```js
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../db/notes.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
```

---

# ✅ **Étape 2 — Remplacer le stockage JSON par SQLite**

Dans `main.js`, remplacer :

```js
const notes = loadNotes();
```

par des requêtes SQL :

```js
const db = require('./main/database');

ipcMain.handle('notes:get', () => {
  return db.prepare("SELECT * FROM notes ORDER BY created_at DESC").all();
});

ipcMain.handle('notes:add', (event, text) => {
  db.prepare("INSERT INTO notes (text) VALUES (?)").run(text);
  return db.prepare("SELECT * FROM notes ORDER BY created_at DESC").all();
});
```

Idem pour `delete`.

---

# ✅ **Étape 3 — Sécuriser l'application**

Dans `main.js`, améliorer la création de fenêtre :

```js
webPreferences: {
  preload: path.join(__dirname, 'preload.js'),
  nodeIntegration: false,
  contextIsolation: true,
  sandbox: true
}
```

Très important pour la soutenance 💡

---

# ✅ **Étape 4 — Exposer seulement des API sûres dans preload**

Dans `preload.js` :

✅ pas de `require` côté renderer
✅ pas d’accès direct au système de fichiers
✅ API minimaliste

---

# ✅ **Étape 5 — Ajouter un module de configuration (UI + JSON)**

Dans `config/user.json` :

```json
{
  "notifications": true,
  "theme": "light"
}
```

Dans `preload.js`, expose :

```js
getConfig: () => ipcRenderer.invoke('config:get'),
updateConfig: (data) => ipcRenderer.invoke('config:update', data)
```

Dans `main.js` :

```js
ipcMain.handle('config:get', () => {
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
});

ipcMain.handle('config:update', (event, data) => {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
  return data;
});
```

---

# ✅ **Étape 6 — Ajouter une notification conditionnelle**

Dans `main.js` :

```js
if (config.notifications) {
  new Notification({ title: "...", body: text }).show();
}
```

---

# ✅ **Étape 7 — Tests unitaires (Jest)**

Installer Jest :

```bash
npm install --save-dev jest
```

Créer `tests/database.test.js` :

```js
const Database = require('better-sqlite3');
const fs = require('fs');

test("Insert and fetch notes", () => {
  const db = new Database(':memory:');
  db.exec("CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)");
  db.prepare("INSERT INTO notes (text) VALUES (?)").run("Hello");

  const notes = db.prepare("SELECT * FROM notes").all();

  expect(notes.length).toBe(1);
  expect(notes[0].text).toBe("Hello");
});
```

Dans `package.json` :

```json
"scripts": {
  "test": "jest"
}
```

---

# ✅ **Étape 8 — Intégrer les tests à la CI**

Modifier votre workflow `.github/workflows/lint.yml` :

```yaml
      - name: Run tests
        run: npm test
```

Le pipeline fait maintenant :

✅ HTML lint
✅ JS lint
✅ Tests unitaires
✅ Installation automatique

C’est digne d’une vraie application pro ✅

---

# ✅ **Livrables du Jour 3**

✅ Base SQLite fonctionnelle
✅ API sécurisée via preload
✅ Configuration utilisateur persistée
✅ Notifications conditionnelles
✅ Tests unitaires Jest
✅ CI/CD : tests + lint + build vérifiés
✅ README mis à jour (Jour 3)

---

# 🎉 **Fin du TP Jour 3 !**

Vous avez désormais une application desktop :

✅ multi-process
✅ sécurisée
✅ testée
✅ versionnée
✅ documentée
✅ prête pour le packaging du Jour 4 💥
