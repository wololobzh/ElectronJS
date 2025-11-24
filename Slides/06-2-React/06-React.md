# ✅ **Création d’UI avec React dans Electron**

Même style, même structure, même ton, slides prêtes à intégrer dans ton dossier `Slides/02-UI_React/`.

---

#### 🎨 Créer une UI moderne avec React

---

#### 📚 Module : Création d’UI avec React dans Electron

* ⏳ **Durée** : 25 minutes
* 📝 **Description** : Découvrez comment intégrer React dans une application Electron pour créer des interfaces modernes, performantes et réactives, tout en respectant l’architecture multi-processus d’Electron.

---

#### 🎯 Objectifs pédagogiques

* ⚛️ **Comprendre** l’intérêt d’utiliser React dans une app desktop.
* 🧱 **Structurer** un projet Electron + React.
* 🔗 **Intégrer** React dans le renderer d’Electron.
* 🔌 **Communiquer** entre React et le backend via IPC.
* 🛡️ **Sécuriser** l’application tout en utilisant React efficacement.

---

#### ⚛️ Pourquoi utiliser React dans Electron ?

---

#### ⚛️ Pourquoi utiliser React dans Electron ?

React apporte :

* ⚡ **Une UI dynamique**
* 🧩 **Composants réutilisables**
* 🎨 **Meilleure organisation du code**
* ♻️ **Rafraîchissement efficace de l’interface**

---

#### ⚛️ Pourquoi utiliser React dans Electron ?

💡 **Electron rend possible l’usage de technologies web**, mais React permet d'aller plus loin :

* Simplifier les interfaces complexes
* Gérer des états multiples
* Optimiser la maintenabilité

---

#### 🗂️ Architecture Electron + React

```
project/
 ├─ main.js
 ├─ preload.js
 ├─ renderer/
 │   ├─ index.html
 │   ├─ App.jsx
 │   ├─ index.jsx
 │   ├─ components/
 │   │     └─ NoteItem.jsx
 ├─ package.json
```

---

#### 🧱 Étape 1 : Initialiser React

Dans le dossier `renderer/` :

```bash
npm create vite@latest
```

Choisissez :

* ✅ React
* ✅ JavaScript

Puis installez :

```bash
npm install
```

---

#### 🧱 Étape 1 : Initialiser React (suite)

Intégrez votre build React dans Electron :

Dans `renderer/index.html` :

```html
<div id="root"></div>
<script type="module" src="/src/index.jsx"></script>
```

---

#### 🔌 Étape 2 : Communiquer avec Electron via preload

---

#### 🔌 Étape 2 : Communiquer avec Electron via preload

Dans `preload.js` :

```js
contextBridge.exposeInMainWorld('api', {
  getNotes: () => ipcRenderer.invoke('notes:get'),
  addNote: (text) => ipcRenderer.invoke('notes:add', text)
});
```

Sécurisé ✅
Isolé ✅
React-friendly ✅

---

#### ⚛️ Étape 3 : Appeler preload depuis React

Dans `App.jsx` :

```jsx
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    window.api.getNotes().then(setNotes);
  }, []);

  function addNote(text) {
    window.api.addNote(text).then(setNotes);
  }

  return (...);
}
```

---

#### 🧩 Étape 4 : UI en composants

Créer `components/NoteItem.jsx` :

```jsx
export default function NoteItem({ text, onDelete }) {
  return (
    <li>
      {text}
      <button onClick={onDelete}>❌</button>
    </li>
  );
}
```

Puis dans `App.jsx`, mappez :

```jsx
{notes.map(n => (
  <NoteItem
    key={n.id}
    text={n.text}
    onDelete={() => deleteNote(n.id)}
  />
))}
```

---

#### 🎨 Étape 5 : Styliser avec Tailwind ou CSS Modules

**Option simple :**

Créer `App.css` :

```css
body {
  background: #f5f5f5;
}
button {
  padding: 6px 10px;
  border-radius: 4px;
}
```

Importer dans `App.jsx` :

```jsx
import "./App.css";
```

---

#### 🔄 Étape 6 : Hot Reload React + Electron

✅ React : via Vite
✅ Electron : via `electronmon` (optionnel)

Exemple :

```bash
npm install --save-dev electronmon
```

Script :

```json
"dev": "concurrently \"npm:start:electron\" \"npm:start:vite\""
```

---

#### 🔌 Étape 7 : IPC + React = bonnes pratiques

* ❌ Ne jamais utiliser `ipcRenderer` directement dans React
* ✅ Toujours passer par `preload.js`
* ✅ Ne pas exposer d’API système dangereuse
* ✅ Valider toutes les données côté main process
* ✅ Garder le renderer “web-only”

---

#### 💡 Étude de cas : interface Noteor en React

Composants possibles :

* `<App />` : logique globale
* `<NoteInput />` : input + bouton
* `<NoteList />` : liste des notes
* `<NoteItem />` : item + bouton
* `<Settings />` : configuration utilisateur

---

#### ✅ Résultat attendu après cet atelier

À la fin de cette partie, vous serez capables de :

* Démarrer un projet **Electron + React**
* Structurer une UI avec plusieurs composants
* Utiliser `useState`, `useEffect` pour gérer les données
* Communiquer proprement avec Electron via IPC
* Maintenir une architecture **sécurisée et moderne**

---

#### 🏁 Conclusion

React est une excellente solution pour :

* Créer des interfaces riches
* Organiser le code en composants
* Rendre votre application desktop évolutive
* Mixer technologie web + capacités système

Electron + React = puissance + confort + modernité ⚡