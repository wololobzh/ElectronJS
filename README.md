# Slideur

## Installation

`npm install`

## Lancement du slideur

`npm start` ou `npm run dev`

Go sur `localhost:1234`

---

# Module : Développement d’applications desktop avec Electron.js

---

## Présentation

Ce module permet aux étudiants de concevoir et développer des applications desktop multiplateformes (**Windows**, **macOS**, **Linux**) à l’aide d’**Electron.js**, en combinant les compétences web (HTML, CSS, JS) avec des capacités natives.

À travers un **projet fil rouge**, les étudiants apprendront à :

* Créer une interface desktop moderne et responsive.  
* Intégrer des fonctionnalités système (fichiers, notifications, stockage local).  
* Gérer les communications entre les processus principaux et rendus.  
* Sécuriser et packager une application pour la distribution.

Ce module s’inscrit dans une logique de **développement fullstack avancé**, en lien avec les compétences attendues en entreprise ou en freelance.

---

## Compétences acquises en fin de module

Les étudiants seront capables de :

* Initialiser un projet **Electron.js** avec une architecture modulaire.  
* Créer des interfaces desktop avec **HTML/CSS/JS** ou **React**.  
* Gérer les processus principaux et rendus (**IPC**).  
* Intégrer des fonctionnalités natives : accès fichiers, notifications, stockage.  
* Sécuriser l’application (sandboxing, `contextBridge`).  
* Packager et distribuer l’application sur plusieurs OS.

---

## Jour 1 – Fondamentaux & Architecture [👨‍🏫](./Jour1)

* Introduction au développement Desktop
* Introduction à Electron.js : principes, cas d’usage
* Initialisation du projet : main.js, preload.js, renderer
* Structure d’un projet Electron modulaire
* Atelier "La Machine à Blagues"
* TP : Création d’un gestionnaire de notes local

---

## Jour 2 – UI & Communication [👨‍🏫](./Jour2/)
* Création d’UI avec HTML/CSS/JS ou React
* Responsive design desktop
* Communication entre processus (IPC)
* Atelier "Liste d'utilisateurs persitée dans un fichier"
* TP : Ajout d’un système de sauvegarde et de notifications

---

## Jour 3 – Fonctionnalités natives & Sécurité [👨‍🏫](./Jour3/)
* Accès au système de fichiers
* Stockage local (SQLite, JSON)
* Sécurité : contextBridge, sandboxing, bonnes pratiques
* Atelier "Liste d'utilisateurs persitée en BDD"
* TP : Ajout d’un module de configuration utilisateur sécurisé

---

## Jour 4 – Packaging & Déploiement [👨‍🏫](./Jour4/)
* Tests et debugging
* Packaging avec Electron Forge / Builder
* Distribution multiplateforme (Windows, macOS, Linux)
* Atelier "Packaging & Déploiement"
* TP final
