#### ✅ Correction détaillée de l’atelier "Machine à Blagues" avec Electron

---

#### Étape 1 : Créer un projet Electron

---

**Problèmes fréquents :**
1. **Erreur lors de l'installation d'Electron** :  
   - Vérifiez que Node.js est bien installé (`node -v` et `npm -v` pour confirmer les versions).  
   - Assurez-vous que la commande `npm install electron --save-dev` est exécutée dans le bon dossier (`blague-machine`).  
2. **Structure de dossier incorrecte** :  
   - Vérifiez que le fichier `package.json` est bien généré dans le dossier racine du projet.

---

#### Étape 2 : Configurer le fichier principal (`main.js`)

---

**Correction potentielle :**

---

1. Si la fenêtre ne s'ouvre pas :  
   - Vérifiez que le fichier `index.html` existe à la racine et que son nom est bien orthographié.  
   - Assurez-vous que `nodeIntegration: true` est bien configuré dans les `webPreferences`.  

---

2. Si une erreur comme "Cannot find module 'electron'" apparaît :  
   - Confirmez que `npm install electron --save-dev` a été exécuté.  
   - Essayez de relancer l’installation avec :  
     ```bash
     npm install
     ```  

---

#### Étape 3 : Créer l'interface utilisateur (`index.html`)

---

**Problèmes fréquents :**
1. **Le bouton ou les blagues ne fonctionnent pas :**  
   - Vérifiez l’ID des éléments dans le code HTML. Les IDs doivent correspondre exactement à ceux utilisés dans le script JavaScript (`joke-btn` et `joke`).  

---

2. **Style CSS non appliqué :**  
   - Assurez-vous que le `<style>` est correctement placé dans la section `<head>` du fichier HTML.  
   - Si un style externe est utilisé, vérifiez que le chemin est correct.

---

3. **Problème de mise en page :**  
   - Ajustez la taille de la fenêtre dans le fichier `main.js` (par exemple, augmentez `width: 800` et `height: 600`).

---

#### Étape 4 : Configurer le script de démarrage (`package.json`)

---
**Problèmes fréquents :**
1. **Erreur avec le script `npm start` :**  
   - Vérifiez que la section `scripts` est correctement configurée :  
     ```json
     "scripts": {
         "start": "electron ."
     }
     ```  
   - Assurez-vous que le fichier `main.js` est présent à la racine du projet et est correctement orthographié.

---

2. **Electron ne démarre pas :**  
   - Supprimez le dossier `node_modules` et relancez :  
     ```bash
     npm install
     npm start
     ```  

---

#### Étape 5 : Tester l'application

---

**Scénarios de tests pour valider l’application :**  
1. **Affichage initial :**
   - La fenêtre doit s’ouvrir avec le titre "Machine à Blagues".  
   - Le bouton "Générer une blague" doit être centré.  

---

2. **Interaction avec le bouton :**
   - En cliquant sur le bouton, une blague doit s’afficher aléatoirement dans la div `.joke`.  
   - Testez plusieurs clics pour confirmer que les blagues changent bien.  

---

3. **Gestion des erreurs :**
   - Si aucune blague n'apparaît, vérifiez que le tableau `jokes` contient bien des données.  
   - En cas d’erreur JavaScript, ouvrez la console développeur (Ctrl+Shift+I sous Windows/Linux ou Cmd+Option+I sur macOS) pour identifier la source.

---

#### Défi supplémentaire : Suggestions d'améliorations  

---

1. **Ajout d’une icône personnalisée :**
   - Ajoutez une propriété `icon` dans la configuration de la fenêtre dans `main.js` :  
     ```js
     mainWindow = new BrowserWindow({
         width: 600,
         height: 400,
         title: "Machine à Blagues",
         icon: "path/to/icon.png", // Chemin vers l'icône
         webPreferences: {
             nodeIntegration: true
         }
     });
     ```  
   - Assurez-vous que l'icône est au format PNG et que son chemin est correct.

---

2. **Ajout de blagues personnalisées par l’utilisateur :**
   - Ajoutez un champ `<input>` et un bouton `<button>` dans le fichier `index.html`.  
   - Mettez à jour le script pour capturer la blague entrée par l’utilisateur et l’ajouter au tableau `jokes` :  
     ```js
     const addJokeBtn = document.getElementById('add-joke-btn');
     const jokeInput = document.getElementById('joke-input');

     addJokeBtn.addEventListener('click', () => {
         const newJoke = jokeInput.value.trim();
         if (newJoke) {
             jokes.push(newJoke);
             jokeInput.value = "";
             alert("Nouvelle blague ajoutée !");
         }
     });
     ```  
---

3. **Animations des blagues :**
   - Ajoutez une animation CSS pour faire apparaître les blagues de manière dynamique :  
     ```css
     .joke {
         margin-top: 20px;
         font-size: 18px;
         font-weight: bold;
         opacity: 0;
         transition: opacity 0.5s ease-in-out;
     }

     .joke.show {
         opacity: 1;
     }
     ```  
   - Activez cette animation dans le script :  
     ```js
     jokeDiv.classList.remove('show');
     setTimeout(() => {
         jokeDiv.textContent = jokes[randomIndex];
         jokeDiv.classList.add('show');
     }, 100);
     ```  

---

#### 🚀 Résultat attendu  

À la fin de l’atelier, les apprenants doivent avoir :  
- Une fenêtre Electron avec un bouton fonctionnel.  
- Une application capable d’afficher une blague aléatoire parmi une liste.  
- Une interface utilisateur agréable et responsive.  

---

🎉 **Bonus** : Les apprenants qui réalisent les défis supplémentaires obtiennent une application plus interactive et personnalisée !