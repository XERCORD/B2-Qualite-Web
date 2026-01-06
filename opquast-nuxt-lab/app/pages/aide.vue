<template>
  <section class="space-y-10 max-w-3xl">
    <!-- Titre -->
    <header class="space-y-3">
      <button
        @click="$router.back()"
        class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition"
      >
        ← Retour
      </button>
      <h1
        class="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100"
      >
        Aide — Comment réussir une règle Opquast
      </h1>

      <p class="text-zinc-300">
        Cette page explique les étapes attendues pour compléter correctement une
        règle du référentiel Opquast dans le cadre de ce projet.
      </p>
    </header>

    <!-- Principe général -->
    <section class="space-y-3">
      <h2 class="text-lg font-semibold text-zinc-100">
        Principe général du projet
      </h2>

      <p class="text-sm text-zinc-300">
        Chaque règle Opquast doit être traduite en une page claire, documentée
        et illustrée par des exemples concrets. L’objectif n’est pas seulement
        de recopier le référentiel, mais de
        <strong>montrer comment appliquer la règle dans un site réel</strong>.
      </p>
    </section>

    <!-- Étape 1 -->
    <section class="space-y-3">
      <h2 class="text-lg font-semibold text-zinc-100">
        Étape 1 — Créer la page de la règle
      </h2>

      <p class="text-sm text-zinc-300">
        Pour chaque règle, vous devez créer une page dédiée dans le dossier :
      </p>

      <pre
        class="rounded-lg bg-zinc-950 border border-zinc-800 p-4 text-xs text-zinc-200"
      >
  app/pages/rules/10.vue
        </pre
      >

      <p class="text-sm text-zinc-300">
        Vous pouvez partir du template existant (par exemple <code>1.vue</code>)
        et modifier le numéro de la règle :
      </p>

      <pre
        class="rounded-lg bg-zinc-950 border border-zinc-800 p-4 text-xs text-zinc-200"
      >
  const ruleId = 10
        </pre
      >
    </section>

    <!-- Étape 2 -->
    <section class="space-y-3">
      <h2 class="text-lg font-semibold text-zinc-100">
        Étape 2 — Ajouter la règle dans <code>rules.json</code>
      </h2>

      <p class="text-sm text-zinc-300">
        Toutes les règles sont centralisées dans le fichier :
      </p>

      <pre
        class="rounded-lg bg-zinc-950 border border-zinc-800 p-4 text-xs text-zinc-200"
      >
  app/data/rules.json
        </pre
      >

      <p class="text-sm text-zinc-300">
        Vous devez ajouter une nouvelle entrée correspondant à votre règle, en
        respectant scrupuleusement la structure suivante :
      </p>

      <pre
        class="rounded-lg bg-zinc-950 border border-zinc-800 p-4 text-xs text-zinc-200 overflow-auto"
      >
  {
    "id": 10,
    "title": "Titre exact de la règle",
    "authors": ["Nom Prénom"],
    "path": "/rules/10",
    "description": "Description officielle issue du référentiel Opquast.",
    "tags": ["Tag1", "Tag2", "Tag3", etc.],
    "objectives": [
      "Objectif 1",
      "Objectif 2", etc.
    ],
    "implementationIntro": "Phrase d’introduction à la mise en œuvre.",
    "implementation": [
      "Action concrète 1",
      "Action concrète 2", etc.
    ],
    "control": [
      "Point de contrôle 1",
      "Point de contrôle 2", etc.
    ],
    "screenshotsSources": [
      "https://example.com", etc.
    ]
  },
        </pre
      >

      <p class="text-sm text-zinc-300">
        ⚠️ Faites très attention aux virgules et aux accolades. Une erreur de
        syntaxe bloquera toute l’application.
      </p>
    </section>

    <!-- Étape 3 -->
    <section class="space-y-3">
      <h2 class="text-lg font-semibold text-zinc-100">
        Étape 3 — Rechercher des exemples concrets (screenshots)
      </h2>

      <p class="text-sm text-zinc-300">
        Pour chaque règle, un travail de recherche est demandé. Vous devez
        identifier des sites réels qui appliquent correctement la règle.
      </p>

      <ul class="list-disc pl-5 text-sm text-zinc-300 space-y-1">
        <li>3 exemples valides = note maximale sur le critère</li>
        <li>Chaque exemple doit être fourni avec sa source (URL)</li>
      </ul>

      <p class="text-sm text-zinc-300">
        Les images doivent être placées dans :
      </p>

      <pre
        class="rounded-lg bg-zinc-950 border border-zinc-800 p-4 text-xs text-zinc-200"
      >
  public/screenshots/rule-10/
    ├─ screenshot-1.png
    ├─ screenshot-2.png
    └─ screenshot-3.png
        </pre
      >

      <p class="text-sm text-zinc-300">
        L’affichage des screenshots est automatique si le nommage est respecté.
        Donc toujours appellé "screenshot-1.png", "screenshot-2.png", etc. Et
        juste changer le numéro du dossier.
      </p>
    </section>

    <!-- Étape 4 -->
    <section class="space-y-3">
      <h2 class="text-lg font-semibold text-zinc-100">
        Étape 4 — Coder un exemple directement dans la page
      </h2>

      <p class="text-sm text-zinc-300">
        En plus des screenshots, vous devez proposer
        <strong>un exemple codé directement sur la page</strong>.
      </p>

      <ul class="list-disc pl-5 text-sm text-zinc-300 space-y-1">
        <li>Un composant simple illustrant la règle</li>
        <li>Un rendu visible dans la page</li>
        <li>
          Le code affiché dans un bloc <code>&lt;pre&gt;&lt;code&gt;</code>
        </li>
        <li>Code facilement copiable</li>
      </ul>

      <p class="text-sm text-zinc-300">
        Vous pouvez améliorer le template fourni (design, clarté, pédagogie).
        Toute amélioration pertinente sera valorisée.
      </p>
    </section>

    <!-- Bonus -->
    <section class="space-y-3">
      <h2 class="text-lg font-semibold text-zinc-100">
        Bonus — Proposer des améliorations au template
      </h2>

      <p class="text-sm text-zinc-300">
        Vous pouvez améliorer le template fourni (design, clarté, pédagogie).
        Toute amélioration pertinente sera valorisée.
      </p>
    </section>

    <!-- Note importante -->
    <section
      class="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 space-y-2"
    >
      <h2 class="text-base font-semibold text-zinc-100">
        Note importante sur la structure du projet
      </h2>

      <p class="text-sm text-zinc-300">
        Le choix d’utiliser des pages numérotées (<code>1.vue</code>,
        <code>2.vue</code>, <code>3.vue</code>, etc.) est
        <strong>intentionnel</strong>.
      </p>

      <p class="text-sm text-zinc-300">
        Il permet une correction plus simple et évite les conflits lorsque
        plusieurs étudiants travaillent simultanément.
      </p>

      <p class="text-sm text-zinc-400">
        En conditions réelles, un système dynamique (<code>[id].vue</code>)
        serait préférable pour alléger le code.
      </p>
    </section>
    <!-- Travail collaboratif et GitHub -->
    <section class="space-y-3">
      <h2 class="text-lg font-semibold text-zinc-100">
        Travail collaboratif — GitHub
      </h2>

      <p class="text-sm text-zinc-300">
        Ce projet est conçu pour être réalisé de manière collaborative, à l’aide
        de GitHub. Même si chaque étudiant travaille sur une règle différente,
        le code produit par les autres peut servir de référence, d’inspiration
        ou de support de compréhension.
      </p>

      <p class="text-sm text-zinc-300">Il est donc attendu que vous :</p>

      <ul class="list-disc pl-5 text-sm text-zinc-300 space-y-1">
        <li>Versionniez régulièrement votre travail (commits fréquents)</li>
        <li>Poussiez votre code sur le dépôt GitHub du projet</li>
        <li>
          Mettiez à jour votre branche avec les évolutions du projet principal
        </li>
      </ul>

      <p class="text-sm text-zinc-300">Travailler de cette manière permet :</p>

      <ul class="list-disc pl-5 text-sm text-zinc-300 space-y-1">
        <li>
          De bénéficier des améliorations apportées par les autres étudiants
        </li>
        <li>
          D’éviter les divergences trop importantes avec la version actuelle
        </li>
        <li>De progresser par comparaison et entraide</li>
      </ul>

      <p class="text-sm text-zinc-400">
        ⚠️ Attention : le fait de copier du code n’est pas un problème en soi,
        tant que vous comprenez ce que vous utilisez et que vous êtes capable de
        l’expliquer. Vous pouvez évidemment utiliser tous les outils à votre
        disposition pour réussir ce projet commun dans le meilleur délai
        possible avec la meilleure qualité possible.
      </p>
    </section>
  </section>
</template>
