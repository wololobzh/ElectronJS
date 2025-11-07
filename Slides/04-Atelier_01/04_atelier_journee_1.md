#### 🤖 Créez votre propre "Machine à Blagues" avec Electron  

#### 📚 Module : Electron  
- ⏳ **Durée** : 45 minutes  
- 📝 **Description** : Initiez-vous au développement d'applications de bureau avec Electron grâce à un exercice ludique : la "Machine à Blagues".  

---

#### 🎯 Objectifs pédagogiques  

- 🌟 Découvrir les bases d'Electron.  
- 🎨 Comprendre comment créer une interface utilisateur simple avec HTML/CSS.  
- 🛠️ Manipuler des événements JavaScript dans un projet Electron.  

---

#### 🖥️ Introduction à Electron  

Electron est un framework permettant de créer des applications de bureau multi-plateformes (**Windows**, **macOS**, **Linux**) à l'aide de technologies web comme **HTML**, **CSS**, et **JavaScript**.  

---

#### 🛠️ Étape 1 : Créer un projet Electron  

```bash
mkdir blague-machine
cd blague-machine
npm init -y
npm install electron --save-dev
```

---

#### 🖋️ Étape 2 : Configurer le fichier principal  

`main.js` pour la création de la fenêtre principale.

```js
const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        title: "Machine à Blagues",
        backgroundColor: "#f0f0f0",
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');
});
```

---

#### 🎨 Étape 3 : Créer l'interface utilisateur  

`index.html` pour l'interface.  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Machine à Blagues</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 20px;
            background-color: #fffae3;
        }
        button {
            background-color: #ff9800;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
        }
        button:hover {
            background-color: #e68900;
        }
        .joke {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Bienvenue dans la Machine à Blagues !</h1>
    <button id="joke-btn">Générer une blague</button>
    <div class="joke" id="joke"></div>
</body>
<script>
    const jokes = [
        "Pourquoi les canards sont-ils toujours à l'heure ? Parce qu'ils sont dans l'étang.",
        "Que dit un oignon quand il se cogne ? Aïe, je vais en pleurer !",
        "Pourquoi les éléphants ne surfent-ils pas sur internet ? Parce qu’ils ont peur des souris.",
        "Quel est le comble pour un électricien ? Ne pas être au courant."
    ];

    const jokeBtn = document.getElementById('joke-btn');
    const jokeDiv = document.getElementById('joke');

    jokeBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        jokeDiv.textContent = jokes[randomIndex];
    });
</script>
</html>
```

---

#### ⚙️ Étape 4 : Configurer le script de démarrage  

Modifiez le fichier `package.json` pour ajouter un script de démarrage.

```json
"scripts": {
    "start": "electron ."
}
```

> 🗣️ **Note** :  
> Ce script permet de lancer l'application directement avec `npm start`.

---

#### 🚀 Étape 5 : Tester l'application  

Lancez votre application en exécutant la commande suivante dans le terminal :

```bash
npm start
```

---

#### 🏅 Défi supplémentaire  

Pour aller plus loin :  

- 🎨 **Ajoutez une icône personnalisée** à la fenêtre.  
- ✍️ **Permettez aux utilisateurs d’ajouter leurs propres blagues** via un champ de texte et un bouton.  
- 🎥 **Animez l’affichage des blagues** pour les rendre plus dynamiques.  

---

#### 🏁 Conclusion  

- 📦 Vous avez appris à créer une application simple avec Electron.  
- 🛠️ Ce projet met en pratique des compétences de base en **JavaScript**, **HTML** et **CSS**.  
- 🌍 **Electron** ouvre la voie à la création d'applications de bureau modernes et multi-plateformes.  
