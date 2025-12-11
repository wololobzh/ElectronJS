# 🎤 **Consignes officielles – Soutenance finale du module Electron.js**

Votre soutenance finale aura pour objectif d’évaluer **votre compréhension globale**, votre capacité à **expliquer vos choix techniques**, et la **qualité professionnelle** de votre application desktop développée pendant les 4 jours du module.

Chaque passage durera **20 minutes**, réparties de la manière suivante :

* **15 minutes d’oral (présentation avec Slides + démonstration)**
* **5 minutes de questions-réponses**

Cette soutenance est **individuelle**, même si certains éléments ont été vus en groupe.

---

## ✅ **⏱️ Durée totale : 15 minutes par apprenant**

### 🔹 **10 minutes d’oral obligatoire (minutées et strictes)**

Vous devez présenter votre projet de manière **claire, structurée, professionnelle**, en couvrant les points suivants :

### **1. Pitch du projet (3 minute)**

* Nom de l’application
* Objectif
* Utilité
* Fonctionnalités principales

### **2. Démonstration de l’application (5 minutes)**

* Présentation rapide de l’interface
* Ajout / suppression de notes
* Chargement des données
* Paramètres utilisateur
* Notifications (si activées)

**Attention :**
La démo doit être fluide, préparée, et sans improvisation hasardeuse.

### **3. Architecture technique (2 minutes)**

Expliquer :

* Le rôle du **processus principal (main)**
* Le rôle du **preload**
* Le rôle du **renderer**
* Le fonctionnement de l’**IPC**
* L’organisation de vos fichiers

Objectif : montrer que vous comprenez votre architecture.

### **4. Sécurité dans Electron (1 minute)**

Vous devez être capable de citer et expliquer :

* `contextIsolation: true`
* `sandbox: true`
* `nodeIntegration: false`
* Exposition d’API limitées dans `preload.js`
* Validation de données côté main

Très important :
Vous devez justifier **pourquoi** ces choix.

### **5. Base de données & stockage (1 minute)**

* Les requêtes principales
* Structure de la table
* Gestion des erreurs (si abordée)

### **6. CI/CD & Qualité du projet (3 minutes)**

Détailler brièvement :

* Linter HTML
* Linter JS (ESLint)
* Tests unitaires Jest
* Workflow GitHub Actions
* Packaging automatique via Electron Builder
* Release automatique via tag versionné (`vX.X.X`)

Montrez que votre pipeline fonctionne réellement.

---

## ✅ **🔹 5 minutes de Questions-Réponses (évaluation approfondie)**

Le formateur pourra vous interroger sur :

### ✅ Votre compréhension technique

* Pourquoi utiliser un preload ?
* Que se passe-t-il si deux IPC se déclenchent en même temps ?
* Comment sécuriser davantage votre app ?
* Comment gérer la corruption de la base de données ?

### ✅ Votre architecture

* Différence entre main et renderer en termes de sécurité
* Pourquoi ne pas exposer directement `fs` ?
* Comment organiser une deuxième fenêtre ?

### ✅ Vos choix dans le projet

* Pourquoi SQLite ?
* Pourquoi ces paramètres dans Electron Builder ?
* Comment organiseriez-vous votre projet en production ?

### ✅ Vos tests & CI/CD

* Pourquoi tester avec une DB en mémoire ?
* Comment valider un IPC via Jest ?

### ✅ Évolutions futures

* Idées d’amélioration
* Déploiement multiplateforme
* Refactor possible

---

# ✅ **📌 Rappels importants**

### ✅ Le temps est strict.

Au bout de 10 minutes, vous serez interrompus pour la session questions.

### ✅ Votre environnement doit être prêt.

* Application lancée
* Repo GitHub ouvert
* Release accessible
* Pas d’installation de dernière minute

### ✅ Votre README doit être complet.

Il sera lu par l’évaluateur.

### ✅ Vous devez montrer une compréhension **globale** du projet.

Pas uniquement “ça marche”.

### ✅ Une bonne soutenance est simple, claire, structurée.

---

# ✅ **🎉 Objectif final**

Montrer que vous êtes capables de :

* Construire une application desktop fonctionnelle
* La sécuriser
* La packager
* La tester
* La déployer
* Et en parler à l’oral comme un professionnel
