# Tests & Debugging dans Electron

## 1. Comprendre les 3 niveaux de debugging dans Electron

Electron combine **3 environnements différents**, chacun ayant ses outils de debugging :

| Contexte             | Description                          | Outils de debug                                  |
| -------------------- | ------------------------------------ | ------------------------------------------------ |
| **Main process**     | Le cœur de l’app (Node.js)           | console.log(), DevTools “Main”, VS Code debugger |
| **Renderer process** | L’UI (comme un navigateur)           | Chrome DevTools, React DevTools                  |
| **Preload**          | Pont sécurisé entre main et renderer | Logging ciblé, breakpoints VS Code               |

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
// renderer.js
api.getVersion().then(v => {
  console.log("[renderer] version reçue :", v);
});
```

---

## 6. Tests automatisés avec Jest

### Tests du Main avec Jest

```bash
npm install --save-dev jest
```

Exemple de test pour une fonction Node :

```js
import { isValidName } from '../src/utils.js';

test("nom valide", () => {
  expect(isValidName("Alice")).toBe(true);
});
```

