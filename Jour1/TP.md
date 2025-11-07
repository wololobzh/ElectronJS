# 🧪 **TP Jour 1 — Crée ton premier gestionnaire de notes desktop avec Electron.js !**

Bienvenue dans le premier TP du module **Développement d’applications desktop avec Electron.js** 🎉
Aujourd’hui, on démarre notre **projet fil rouge** : une application desktop que *vous* allez créer de A à Z.

Pour cette première journée, on va construire la base d’un petit gestionnaire de notes local nommé **Noteor** (oui, ça sonne comme un super-vilain… et alors ? 😎).

L’objectif :
👉 apprendre les fondamentaux d’Electron
👉 comprendre l’architecture main / preload / renderer
👉 manipuler de vraies fonctionnalités desktop (fichier local !)
👉 et poser les fondations de votre future super-application.

---

# ✅ **Objectifs du TP**

À la fin de la journée, vous serez capables de :

✅ Créer une app Electron qui s’ouvre dans une vraie fenêtre desktop
✅ Envoyer des messages entre le backend (main) et le frontend (renderer)
✅ Stocker des données dans un fichier JSON
✅ Créer une petite UI avec HTML/CSS/JS
✅ Structurer proprement votre projet (utile pour l’évaluation 👀)

---

# ✨ **Modalités d’évaluation du module**

Votre travail dans ce TP (et les suivants) compte pour l’évaluation finale du module.
Voici comment vous serez évalués :

## ✅ **1. Évaluation continue (pendant le module)**

À chaque journée, vous devrez faire avancer votre projet.
Nous regarderons :

* votre structure de code
* l'avancée fonctionnelle
* la qualité du dépôt GitHub
* votre capacité à itérer et améliorer votre app

C’est simple : **faites avancer votre projet à un rythme constant**.

---

## ✅ **2. Écrit technique : documentation du projet**

Un fichier **README.md** devra être rédigé sur votre dépôt GitHub.
Il servira de support pour expliquer :

* comment installer et lancer votre app
* l’organisation technique du projet
* vos choix techniques
* les fonctionnalités implémentées
* vos prochaines évolutions possibles

Ce document fait partie de la note.

---

## ✅ **3. Soutenance orale (fin du module)**

Vous présenterez votre application desktop à l’oral :

🎤 Démo de l’application
🧠 Explication technique (main / preload / renderer / IPC / sécurité / build)
🎯 Retour sur vos choix et la réalisation du module

Tout doit être prêt sur votre GitHub au jour de la soutenance :
✅ code propre
✅ README à jour
✅ actions GitHub fonctionnelles
✅ démonstration fluide

---

# 🌱 **Ce que vous devez rendre dès la fin du Jour 1**

### ✅ 1. Un dépôt GitHub propre

Le nom est libre, mais évitez “test123” 😅
Exemples :

* `noteor-desktop`
* `my-electron-notes-app`
* `electron-notepad`

Votre dépôt doit contenir :
✅ Le code du TP
✅ Un dossier `data/notes.json`
✅ Un readme minimal mais existant
✅ Une action GitHub pour linter votre HTML

---

### ✅ 2. Un fichier **README.md**

Contenu minimum aujourd’hui :

* Nom du projet
* Description courte
* Instructions d’installation
* Instructions de lancement
* Capture d’écran (si possible)
* Petit paragraphe sur ce que vous avez appris du Jour 1

Vous l’enrichirez tout au long de la formation.

---

### ✅ 3. Une GitHub Action qui exécute un linter HTML

Oui, même pour une app desktop 😁
On automatise dès le début.

Voici un exemple de workflow que vous pouvez copier dans :
`.github/workflows/lint.yml`

```yaml
name: HTML Lint

on:
  push:
    branches: ["main"]
  pull_request:

jobs:
  html-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install htmlhint
        run: npm install -g htmlhint

      - name: Run HTMLHint
        run: htmlhint "**/*.html"
```

---

# 🚀 **TP — Développe Noteor (Jour 1)**

## ✅ Étape 0 — Installation et lancement du projet

Dans votre dossier de travail :

```bash
npm install
npm start
```

Si tout va bien, votre fenêtre Electron s’ouvre.
Et le rendu web est disponible sur `localhost:1234`.

---

## ✅ Étape 1 — Préparer la structure du projet

Vous devez obtenir :

```
project/
 ├─ main.js
 ├─ preload.js
 ├─ renderer/
 │   ├─ index.html
 │   ├─ index.js
 └─ data/
     └─ notes.json
```

Créer le fichier :

```json
[]
```

Il contiendra vos notes.

---

## ✅ Étape 2 — Créer l’interface de Noteor (HTML)

Dans `renderer/index.html` :

```html
<h1>Noteor 📝</h1>

<input id="noteInput" placeholder="Écris ta note..." />
<button id="addNoteBtn">Ajouter</button>

<ul id="notesList"></ul>
```

Du HTML simple mais efficace.

---

## ✅ Étape 3 — Exposer une API sécurisée dans `preload.js`

```js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('notesAPI', {
  getNotes: () => ipcRenderer.invoke('notes:get'),
  addNote: (text) => ipcRenderer.invoke('notes:add', text)
});
```

---

## ✅ Étape 4 — Gérer les notes côté main process (`main.js`)

```js
const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const notesPath = path.join(__dirname, 'data', 'notes.json');

function loadNotes() {
  return JSON.parse(fs.readFileSync(notesPath, 'utf-8'));
}

function saveNotes(notes) {
  fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
}

ipcMain.handle('notes:get', () => loadNotes());

ipcMain.handle('notes:add', (event, text) => {
  const notes = loadNotes();
  notes.push({ id: Date.now(), text });
  saveNotes(notes);
  return notes;
});
```

---

## ✅ Étape 5 — Gérer l’UI et la logique côté renderer

Dans `renderer/index.js` :

```js
const input = document.getElementById('noteInput');
const addBtn = document.getElementById('addNoteBtn');
const list = document.getElementById('notesList');

function renderNotes(notes) {
  list.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note.text;
    list.appendChild(li);
  });
}

window.notesAPI.getNotes().then(renderNotes);

addBtn.addEventListener('click', async () => {
  const text = input.value.trim();
  if (!text) return;

  const notes = await window.notesAPI.addNote(text);
  renderNotes(notes);
  input.value = '';
});
```

---

# 🎉 **Fin du TP Jour 1 !**

Bravo !
Vous avez créé votre **première application desktop Electron** 🎉
Vous avez utilisé IPC, manipulé un fichier local, et structuré un vrai projet.

Demain, on ajoute :

✅ UI responsive
✅ Communication avancée
✅ Notifications
✅ Sauvegardes automatiques
