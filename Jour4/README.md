Avec plaisir !
Voici le **TP Final – Jour 4**, rédigé pour les apprenants, ton sympa, clair, structuré, et en cohérence avec tout le module.
Ce TP clôt le projet fil rouge et prépare directement la **soutenance**, l’**écrit technique**, et la **mise en production réelle**.

---

# 🧪 **TP Final — Jour 4 : Packaging, Déploiement & Release de votre application Electron**

🎉 **Félicitations !**
Vous êtes arrivés au **dernier jour du module**.
Aujourd’hui, votre application desktop devient un **logiciel installable**, partageable, versionné, et prêt pour une vraie release.

Ce TP vous fait passer d’une “application qui marche sur votre machine” à une **application distribuable comme un vrai logiciel** ✅

---

# 🎯 **Objectifs du jour**

À la fin du TP, vous serez capables de :

✅ Packager une application Electron pour Windows / macOS / Linux
✅ Générer un exécutable (EXE, DMG, AppImage…)
✅ Préparer une version prête à distribuer
✅ Automatiser le packaging dans GitHub Actions
✅ Générer une release GitHub automatiquement
✅ Finaliser votre README pour la soutenance
✅ Auditer votre application pour la sécurité

C’est **LE TP** qui transforme votre projet en application “livrée”.

---

# ✅ Étape 0 — Installation d’Electron Builder

Nous allons utiliser **Electron Builder**, la solution la plus simple et la plus robuste pour packager des apps Electron.

Installez-le :

```bash
npm install --save-dev electron-builder
```

Ajoutez un script dans `package.json` :

```json
"scripts": {
  "dist": "electron-builder"
}
```

---

# ✅ Étape 1 — Configuration minimale d’Electron Builder

Créez un fichier `electron-builder.yml` à la racine :

```yaml
appId: com.noteor.app
productName: Noteor
directories:
  output: dist
files:
  - "dist/**/*"
  - "main.js"
  - "preload.js"
  - "renderer/"
  - "db/"
  - "config/"
extraResources:
  - from: "./db/"
    to: "db"
  - from: "./config/"
    to: "config"
win:
  target: nsis
linux:
  target: AppImage
mac:
  target: dmg
```

✅ Vous êtes maintenant capables de packager sur votre propre OS.

---

# ✅ Étape 2 — Test du packaging local

Exécutez :

```bash
npm run dist
```

Si tout va bien, vous verrez un dossier :
👉 **/dist**

Contenant par exemple :

* `Noteor Setup.exe` (Windows)
* `Noteor.dmg` (macOS)
* `Noteor.AppImage` (Linux)

---

# ✅ Étape 3 — Ajouter une commande "version" dans package.json

Pour publier automatiquement une version réelle, ajoutez :

```json
"version": "1.0.0"
```

Lorsque vous changerez cette version, GitHub créera une release.

---

# ✅ Étape 4 — GitHub Actions : workflow de packaging automatique

Créez un fichier :
`.github/workflows/release.yml`

```yaml
name: Build & Release

on:
  push:
    tags:
      - "v*.*.*"

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Install Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build distributables
        run: npm run dist

      - name: Upload Release Assets
        uses: softprops/action-gh-release@v1
        with:
          files: dist/**/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

# ✅ Étape 5 — Publier une release via un tag

Pour publier votre app automatiquement :

```bash
git tag v1.0.0
git push origin v1.0.0
```

Et tadaaa 🎉 :
✅ GitHub Actions va :

1. Installer votre app
2. Générer les builds
3. Créer une Release GitHub
4. Ajouter automatiquement tous les fichiers (.exe, .dmg, .AppImage)

C’est la cerise sur le gâteau du module 💥

---

# ✅ Étape 6 — Auditer la sécurité

### ✅ Check 1 : `nodeIntegration: false`

✅ Check 2 : `contextIsolation: true`
✅ Check 3 : `sandbox: true`
✅ Check 4 : API minimaliste dans preload
✅ Check 5 : Validation des données utilisateur
✅ Check 6 : Aucune fonction dangereuse exposée
✅ Check 7 : Tests unitaires ok dans CI

Ajoutez une section dans votre README :
👉 **Audit de sécurité Electron**

---

# ✅ Étape 7 — Finalisation du README (écrit technique)

Votre README doit maintenant contenir :

### ✅ 1. Présentation de l’application

* objectif
* fonctionnalités majeures

### ✅ 2. Guide d’installation

* Installation Node
* Lancement dev
* Packaging local

### ✅ 3. Architecture technique

* explication main / preload / renderer
* gestion IPC
* gestion BDD SQLite
* fichiers importants

### ✅ 4. Sécurité

* sandbox
* isolation
* API réduite

### ✅ 5. CI/CD

* lint HTML
* lint JS
* tests Jest
* build
* release automatique

### ✅ 6. Release téléchargeable

Lien vers votre release GitHub ✅

### ✅ 7. Roadmap

Liste de features futures.

---

# ✅ Étape 8 — Préparation à la soutenance

Vous devez être capables de présenter :

👉 Comment fonctionne Electron (process principal / processus rendu / preload)
👉 Comment vous avez structuré l’architecture
👉 D’où viennent vos données (SQLite)
👉 Comment vous avez sécurisé votre app
👉 Comment fonctionne votre CI/CD
👉 Comment se génère une release automatiquement
👉 Démo live : ajout/suppression de notes + config + notification
👉 Mise en situation : “Et si l’app grandit demain ?”

Je vous conseille d’ajouter dans votre README une section :
📌 **“Enjeux techniques rencontrés & solutions”**

Ça fait une excellente impression en soutenance.

---

# ✅ Livrables du Jour 4

✅ Build local fonctionnel
✅ Release GitHub générée via tag
✅ Workflow release.yml opérationnel
✅ README complet & pro
✅ Projet sécurisé
✅ Tests unitaires dans la CI
✅ Version 1.0.0 publiée

---

# 🎉 **Fin du module !**

Vous avez maintenant :

✅ une application desktop complète
✅ une architecture professionnelle
✅ une base SQLite robuste
✅ une API sécurisée
✅ une UI stylée
✅ un CI/CD complet
✅ un packaging multiplateforme
✅ une release automatisée
✅ et un README digne d’un repo GitHub d’entreprise

Bravo pour votre travail.
Vous êtes prêts pour la soutenance 🎤🔥