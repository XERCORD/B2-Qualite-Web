# Opquast Lab — Qualité Web appliquée

Ce projet est un **laboratoire pédagogique** basé sur le référentiel  
**Opquast — Qualité Numérique**.

L’objectif est de traduire les règles du référentiel en **pages concrètes**,
illustrées par :

- des descriptions claires,
- des exemples réels (screenshots),
- des mises en œuvre codées.

Chaque règle correspond à **une page dédiée**.

---

## 🧱 Architecture du projet

```txt
opquast-nuxt-lab/
├─ app/
│  ├─ app.vue
│  ├─ data/
│  │  ├─ rules.json     # Données des règles (référentiel)
│  │  └─ rules.js       # Accès aux données
│  └─ pages/
│     ├─ index.vue      # Accueil (liste des règles)
│     ├─ aide.vue       # Méthodologie et consignes
│     └─ rules/
│        ├─ 1.vue
│        ├─ 2.vue
│        └─ 10.vue      # Une règle = une page
│
├─ public/
│  └─ screenshots/
│     └─ rule-1/
│        ├─ screenshot-1.png
│        ├─ screenshot-2.png
│        └─ screenshot-3.png
│
├─ nuxt.config.js
├─ package.json
└─ README.md
```

## 📐 Principe de fonctionnement

- Toutes les règles sont décrites dans `app/data/rules.json`.

- Chaque règle possède :
  - une entrée dédiée dans le fichier JSON ;
  - une page correspondante dans `app/pages/rules/`.

- Les screenshots sont chargés automatiquement depuis `public/screenshots/`.

- Les exemples codés sont intégrés directement dans la page de la règle.

Le projet privilégie :

- la **lisibilité** ;
- la **clarté pédagogique** ;
- la **compréhension par l’exemple**.

## 🧭 Pages importantes

- `/`  
  Page d’accueil listant l’ensemble des règles disponibles.

- `/rules/1`, `/rules/2`, `/rules/10`, etc.  
  Pages de démonstration des règles, une règle = une page.

- `/aide`  
  Page méthodologique expliquant le travail attendu et la logique du projet.

---

## 🛠️ Installation

Installer les dépendances :

```bash
npm install
```

Lancer le projet en local :

```bash
npm run dev
```

Puis ouvrir le navigateur:

```bash
http://localhost:3000
```

## 📚 Référentiel Opquast

Les règles sont issues du référentiel officiel :

https://checklists.opquast.com/fr/qualite-numerique

---

## 🧩 Choix techniques

- Nuxt (mode pages)
- Tailwind CSS
- Pages numérotées (`1.vue`, `2.vue`, etc.) par choix pédagogique
- Données centralisées dans un fichier JSON

En contexte de production, une approche dynamique (`[id].vue`) serait préférable.  
Ici, le choix est **volontaire et assumé** afin de faciliter le travail simultané et la correction.

---

## 🎓 Contexte pédagogique

Ce projet a pour objectifs de :

- apprendre à lire et interpréter un référentiel ;
- illustrer une règle par des exemples réels ;
- proposer une mise en œuvre technique compréhensible ;
- travailler dans un projet structuré et collaboratif.

Pour apprendre comment contribuer au projet, aller dans la page Aide du projet.
