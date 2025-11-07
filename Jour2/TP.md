# 🧪 **TP Jour 2 — Améliore ton app desktop (UI, IPC avancé, sauvegarde & notifications)**

Vous avez survécu au Jour 1 ✔️
Vous avez une app Electron qui tourne, qui stocke des notes, et qui a déjà une petite structure propre. Bravo ! 🔥

Aujourd’hui… on passe au niveau supérieur 😎

Le but du jour :
✅ améliorer l’interface
✅ utiliser de la vraie communication IPC bidirectionnelle
✅ persister automatiquement les données
✅ ajouter une notification système
✅ améliorer votre CI/CD : ajout d’un **linter JS** + mutualisation des workflows

---

# 🎯 **Objectifs de la journée**

À la fin du TP, vous saurez :

✅ Créer une UI plus agréable et responsive
✅ Communiquer proprement entre le main process et le renderer
✅ Sauvegarder automatiquement les notes dans un fichier
✅ Afficher une notification système native
✅ Mettre en place un **linter JavaScript (ESLint)**
✅ Améliorer votre workflow GitHub Actions (HTML + JS lint)

---

# ✅ **Avant de commencer : Mise à jour du dépôt GitHub**

Aujourd'hui, vous devez impérativement avoir :

✅ un dépôt GitHub propre
✅ un README mis à jour après le Jour 1
✅ une action GitHub existante (HTML linter)

Nous allons l’améliorer très bientôt 👀

---

# 🚀 **TP Jour 2**

## ✅ Étape 1 — Améliorer l’UI

Objectif : rendre l’app plus agréable.

👉 Ajoutez un peu de style dans un fichier `renderer/style.css`.

Exemple simple :

```css
body {
  font-family: sans-serif;
  padding: 20px;
  background: #f5f5f5;
}

input {
  padding: 8px;
  width: 250px;
}

button {
  padding: 8px 12px;
  margin-left: 6px;
  cursor: pointer;
}

ul {
  margin-top: 20px;
  padding: 0;
}

li {
  background: white;
  padding: 8px;
  margin-bottom: 6px;
  border-radius: 4px;
  list-style: none;
}
```

Dans `index.html`, ajoute :

```html
<link rel="stylesheet" href="./style.css" />
```

👉 **Livrable du jour : une UI stylée (minimum esthétique).**

---

## ✅ Étape 2 — Ajouter les boutons “Supprimer” sur chaque note

Objectif : première interaction dynamique avancée.

Dans `renderer/index.js`, modifiez `renderNotes()` :

```js
function renderNotes(notes) {
  list.innerHTML = '';

  notes.forEach(note => {
    const li = document.createElement('li');

    li.textContent = note.text;

    const delBtn = document.createElement('button');
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "10px";

    delBtn.addEventListener('click', () => {
      window.notesAPI.deleteNote(note.id).then(renderNotes);
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
```

---

## ✅ Étape 3 — Nouveau canal IPC : supprimer une note

Dans **preload.js** :

```js
deleteNote: (id) => ipcRenderer.invoke('notes:delete', id)
```

Dans **main.js**, ajouter :

```js
ipcMain.handle('notes:delete', (event, id) => {
  const notes = loadNotes().filter(n => n.id !== id);
  saveNotes(notes);
  return notes;
});
```

---

## ✅ Étape 4 — Sauvegarde automatique

Dès qu’une note est ajoutée ou supprimée, elle est déjà sauvegardée.
Ici, vous allez ajouter une **auto-refresh** toutes les 5 secondes.

Dans `renderer/index.js` :

```js
setInterval(() => {
  window.notesAPI.getNotes().then(renderNotes);
}, 5000);
```

👉 Ça simule une synchro distante.
(Ne vous inquiétez pas : demain, vous verrez des façons plus élégantes).

---

## ✅ Étape 5 — Ajouter une notification native

Dans `main.js`, ajoutez :

```js
const { Notification } = require('electron');

function showNotification(text) {
  new Notification({
    title: "Note ajoutée 📝",
    body: text
  }).show();
}

ipcMain.handle('notes:add', (event, text) => {
  const notes = loadNotes();
  notes.push({ id: Date.now(), text });
  saveNotes(notes);

  showNotification(text);

  return notes;
});
```

👉 À chaque note ajoutée, une notif apparaîtra 🎉

---

# ✅ **Étape 6 — CI/CD : améliorer votre pipeline GitHub**

Aujourd’hui, vous devez :

✅ ajouter un linter JS (ESLint)
✅ l’exécuter automatiquement dans GitHub Actions
✅ fusionner les deux linters dans un seul workflow

---

## ✅ Installer ESLint dans votre projet

```bash
npm install eslint --save-dev
npx eslint --init
```

Choisissez :

* ✅ "To check syntax and find problems"
* ✅ ES Modules
* ✅ Browser + Node
* ✅ Format JSON

Cela génère `.eslintrc.json`.

---

## ✅ Ajouter une commande npm

Dans `package.json` :

```json
"scripts": {
  "lint:js": "eslint .",
  "lint:html": "htmlhint '**/*.html'"
}
```

---

## ✅ Créer un workflow unifié

Dans `.github/workflows/lint.yml` :

```yaml
name: Lint Project

on:
  push:
    branches: ["main"]
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Install HTMLHint
        run: npm install -g htmlhint

      - name: Lint HTML
        run: npm run lint:html

      - name: Lint JS
        run: npm run lint:js
```

👉 Dorénavant, à chaque push :
✅ HTML contrôlé
✅ JS contrôlé
✅ pipeline propre et pro comme en entreprise ⚙️

---

# ✅ **Livrables du Jour 2**

À rendre sur ton dépôt GitHub :

✅ Une interface améliorée
✅ Boutons de suppression fonctionnels
✅ Synchronisation auto (refresh)
✅ Notification système à l’ajout
✅ Workflow GitHub avec HTML + JS linter
✅ README mis à jour (section “Jour 2”)

---

# 🎉 **Fin du TP Jour 2 !**

Vous avez :

🔥 amélioré votre UI
🔥 créé vos premières interactions avancées
🔥 ajouté des notifications desktop
🔥 amélioré votre CI/CD
🔥 produit un workflow GitHub de niveau pro

Demain… vous touchez au **système de fichiers**, à la **BDD**, à la **sécurité**, aux **permissions**, et à la **communication sécurisée preload ↔ renderer** 👀
