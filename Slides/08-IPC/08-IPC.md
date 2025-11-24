
#### 🔌 Communication entre processus (IPC) dans Electron

---

#### 📚 Module : Comprendre l’IPC dans Electron

* ⏳ **Durée** : 25 minutes
* 📝 **Description** : Découvrez comment les processus d’Electron communiquent entre eux, pourquoi cette séparation est essentielle, et comment utiliser IPC de manière sécurisée dans vos applications desktop.

---

#### 🎯 Objectifs pédagogiques

* 🧠 **Comprendre** la séparation main / preload / renderer.
* 🔌 **Maîtriser** les différents canaux IPC d’Electron (`invoke`, `send`).
* 🛡️ **Implémenter** une communication sécurisée via `contextBridge`.
* ⚙️ **Structurer** vos échanges entre processus.
* ✅ **Éviter** les mauvaises pratiques qui compromettent la sécurité.

---

#### 🧱 Architecture interne d’Electron

---

#### 🧱 Architecture interne d’Electron

Electron fonctionne avec 3 couches :

* 🧭 **Main process** → pilote l’application (fenêtres, système, filesystem).
* 🎨 **Renderer** → interface utilisateur (React / HTML / JS).
* 🛡️ **Preload** → passerelle sécurisée entre les deux.

---

#### 🧱 Pourquoi cette séparation ?

* 🔐 **Sécurité** : le renderer n’a pas accès au système.
* 🪟 **Stabilité** : un bug UI ne fait pas planter l’app entière.
* ⚙️ **Performance** : tâches système centralisées dans le main process.
* ♻️ **Architecture modulaire**.

---

#### 🔌 Qu’est-ce que l’IPC ?

---

#### 🔌 Qu’est-ce que l’IPC ?

IPC signifie **Inter-Process Communication**.

C’est le mécanisme qui permet à :

* Le renderer → d’envoyer des requêtes au main
* Le main → de répondre ou d’envoyer des événements

💡 Imaginez-le comme un **bus de messages interne**.

---

#### 🔄 Les deux types de communications IPC

---

#### 🔄 Les deux types de communications IPC

| Méthode                | Sens            | Description             |
| ---------------------- | --------------- | ----------------------- |
| `ipcRenderer.invoke()` | Renderer → Main | Appel async avec retour |
| `ipcRenderer.send()`   | Renderer → Main | Envoi sans retour       |
| `ipcMain.handle()`     | Main → Renderer | Répond à un `invoke`    |
| `webContents.send()`   | Main → Renderer | Push d’événements       |

---

#### 🧠 Exemple simple : invoquer un handler

Renderer → Main :

```js
window.api.getNotes().then(notes => {
  console.log(notes);
});
```

Preload expose :

```js
contextBridge.exposeInMainWorld('api', {
  getNotes: () => ipcRenderer.invoke('notes:get')
});
```

Main reçoit :

```js
ipcMain.handle('notes:get', () => {
  return loadNotes();
});
```

---

#### 🔄 Exemple : envoyer des événements du Main au Renderer

Main → Renderer :

```js
mainWindow.webContents.send('window:resized');
```

Renderer écoute :

```js
ipcRenderer.on('window:resized', () => {
  console.log("Fenêtre redimensionnée");
});
```

✅ Pour push des notifications
✅ Pour mise à jour en temps réel

---

#### 🛡️ Sécuriser l’IPC

---

#### 🛡️ Sécuriser l’IPC

1. ✅ Toujours passer par **preload**
2. ✅ Ne jamais exposer `ipcRenderer` directement
3. ✅ Limiter le nombre de méthodes exposées
4. ✅ Valider toutes les données côté main
5. ✅ Ne jamais exposer `fs`, `path`, `child_process` au renderer

---

#### 🛡️ Sécuriser l’IPC : exemple

Preload (API restreinte) :

```js
contextBridge.exposeInMainWorld('api', {
  addNote: (text) => ipcRenderer.invoke('notes:add', text)
});
```

❌ Mauvaise pratique :

```js
window.ipc = ipcRenderer; // ❌ Danger !
```

Risque : accès complet au système depuis la UI.

---

#### ⚙️ Structurer vos canaux IPC

Organiser vos handlers par modules :

```
main/
 ├─ ipc/
 │    ├─ notes.js
 │    ├─ config.js
 │    └─ window.js
 ├─ main.js
```

Dans chaque fichier :

```js
module.exports = (ipcMain, db) => {
  ipcMain.handle('notes:get', () => {...})
}
```

👉 Plus propre
👉 Plus maintenable

---

#### 🧪 Tester votre IPC

Avec Jest (exemple simple) :

```js
test("adds a note", () => {
  const result = addNoteHandler("Hello");
  expect(result.text).toBe("Hello");
});
```

💡 On teste la logique du handler, pas Electron directement.

---

#### ❗ Pièges à éviter

* ❌ Mélanger logique métier et IPC
* ❌ Utiliser IPC pour tout (limiter aux actions système)
* ❌ Exposer trop d’API au renderer
* ❌ Faire passer des objets trop lourds par IPC
* ❌ Ne pas nettoyer les listeners

---

#### ✅ IPC : quand l’utiliser ?

* Lecture/écriture fichiers
* Accès à la base de données
* Notifications système
* Gestion des fenêtres
* Paramètres utilisateurs
* Actions sensibles nécessitant isolation

---

#### ✅ IPC : quand NE PAS l’utiliser ?

* Gérer l’état UI → ❌
* Logique locale du renderer → ❌
* Données déjà disponibles côté renderer → ❌

---

#### 💡 Exemple concret : Noteor

IPC utilisé pour :

* ✅ Lire les notes SQLite
* ✅ Ajouter / supprimer des notes
* ✅ Lire et écrire la configuration utilisateur
* ✅ Envoyer des notifications depuis le main

---

#### ✅ Résultat attendu après ce module

Vous serez capables de :

* Expliquer l’architecture multi-processus d’Electron
* Construire une API sécurisée dans `preload.js`
* Gérer les appels `invoke` et les événements push
* Organiser proprement vos différents canaux
* Éviter les mauvaises pratiques dangereuses

---

#### 🏁 Conclusion

L’IPC est **le cœur d’Electron**.

C’est la frontière entre :

🖥️ votre interface (renderer)
⚙️ vos fonctionnalités système (main)

Bien maîtrisé, il permet de créer des applications desktop robustes, sécurisées et parfaitement architecturées.
