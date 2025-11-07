#### 🛠️ Installer et configurer les environnements de développement

---

#### 📚 Module : Développement Desktop (Electron/.NET/Java)  
- ⏳ **Durée** : 1h30  
- 📝 **Description** : Apprenez à installer et configurer les environnements nécessaires pour le développement d'applications desktop avec Electron, .NET et Java.

---

#### 🎯 Objectifs pédagogiques  

- 🔧 Installer les outils nécessaires au développement desktop pour Electron, .NET et Java.  
- ⚙️ Configurer les environnements de développement en fonction des besoins des projets.  
- ✅ Tester les installations pour vérifier leur bon fonctionnement.  

---

#### 🖥️ Introduction à l'installation des environnements de développement  

> 🗣️ **Note** :  
> Un environnement de développement correctement configuré est la première étape pour démarrer tout projet logiciel. Chaque technologie nécessite des outils spécifiques qui doivent être installés et configurés correctement.  

---

#### 📋 Prérequis pour les installations  

```text
1. Système d'exploitation compatible :  
   - Windows 10 ou supérieur.  
   - macOS 10.15 ou supérieur.  
   - Linux (Ubuntu 20.04 ou supérieur).  
2. Accès administrateur pour installer des logiciels.  
3. Connexion Internet pour télécharger les outils nécessaires.  
```

---

#### 🌐 Installation et configuration pour **Electron**  

```bash
# Étape 1 : Installer Node.js et npm
Téléchargez Node.js sur https://nodejs.org et installez la version LTS.

# Étape 2 : Vérifiez l'installation
node -v   # Affiche la version de Node.js
npm -v    # Affiche la version de npm

# Étape 3 : Créez un projet Electron de base
mkdir electron-app
cd electron-app
npm init -y
npm install electron --save-dev
```

---

##### ✨ Démonstration  

**Création d’un projet simple :**  
- 📂 [Voir démonstration détaillé](https://github.com/wololobzh/DemonstrationElectronDesktop).  
- 🏃‍♂️ Lancez votre application avec `npx electron .`.  

---

#### 🏁 Conclusion  

- ✅ Un environnement de développement bien configuré est essentiel pour éviter les problèmes techniques en cours de projet.  
- 📦 Les étapes d'installation pour Electron sont simples, mais nécessitent une attention particulière aux détails.  
- 🧪 Testez toujours vos installations avant de commencer à coder pour éviter des blocages inutiles.
