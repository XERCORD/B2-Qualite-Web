<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 28
const rule = getRuleById(ruleId)
const activeTab = ref('preview')
</script>

<template>
  <section v-if="rule" class="space-y-6">
    <!-- Header -->
    <header class="space-y-3">
      <button
        @click="$router.back()"
        class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition"
      >
        ← Retour
      </button>
      <div class="text-sm text-zinc-400">Règle n° {{ rule.id }}</div>

      <h1
        class="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100"
      >
        {{ rule.title }}
      </h1>

      <div class="text-base sm:text-sm tracking-tight text-zinc-300">
        {{ rule.description }}
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in rule.tags"
          :key="tag"
          class="text-xs rounded-full border border-zinc-800 bg-zinc-900/30 px-2.5 py-1 text-zinc-300"
        >
          {{ tag }}
        </span>
      </div>

      <div
        v-if="rule.authors && rule.authors.length"
        class="text-sm text-zinc-400"
      >
        Écrit par
        <span class="text-zinc-300">
          {{ rule.authors.join(', ') }}
        </span>
      </div>
    </header>

    <!-- Objectif -->
    <section class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <h2 class="text-lg font-semibold tracking-tight text-zinc-100">
        Objectif
      </h2>

      <ul class="mt-1 list-disc pl-5 space-y-2 text-sm text-zinc-300">
        <li v-for="o in rule.objectives" :key="o">{{ o }}</li>
      </ul>
      <ul
        v-if="Array.isArray(rule.objectives)"
        class="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-300"
      >
        <li v-for="o in rule.objectives" :key="o">{{ o }}</li>
      </ul>

      <p v-else class="mt-1 list-disc pl-5 space-y-2 text-sm text-zinc-300">
        {{ rule.objective }}
      </p>
    </section>

    <!-- Mise en œuvre -->
    <section class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <h2 class="text-lg font-semibold tracking-tight text-zinc-100">
        Mise en œuvre
      </h2>

      <p v-if="rule.implementationIntro" class="mt-3 text-sm text-zinc-400">
        {{ rule.implementationIntro }}
      </p>

      <ul class="mt-1 list-disc pl-5 space-y-2 text-sm text-zinc-300">
        <li v-for="x in rule.implementation" :key="x">{{ x }}</li>
      </ul>
    </section>

    <!-- Contrôle -->
    <section class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <h2 class="text-lg font-semibold tracking-tight text-zinc-100">
        Contrôle
      </h2>

      <ul class="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-300">
        <li v-for="c in rule.control" :key="c">{{ c }}</li>
      </ul>
    </section>

    <!-- Screenshots -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold tracking-tight text-zinc-100">
        Screenshots
      </h2>

      <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-light">
        <div
          v-for="(source, index) in rule.screenshotsSources"
          :key="source + index"
          class="shrink-0 w-[280px] sm:w-[340px]"
        >
          <div
            class="aspect-[16/10] rounded-2xl border border-zinc-800 bg-zinc-900/20 overflow-hidden flex items-center justify-center"
          >
            <!-- Image -->
            <a
              :href="`/screenshots/rule-${rule.id}/screenshot-${index + 1}.png`"
              target="_blank"
              rel="noreferrer"
              class="block cursor-zoom-in"
            >
              <img
                :src="`/screenshots/rule-${rule.id}/screenshot-${
                  index + 1
                }.png`"
                :alt="`Exemple d'application de la règle ${rule.id}`"
                class="h-full w-full object-cover"
                onerror="
                  this.style.display = 'none'
                  this.nextElementSibling.style.display = 'block'
                "
              />
            </a>

            <!-- Placeholder -->
            <div class="hidden text-center px-4">
              <div class="text-sm text-zinc-300 font-medium">
                Screenshot à ajouter
              </div>
              <div class="mt-1 text-xs text-zinc-500">Exemple réel attendu</div>
            </div>
          </div>

          <!-- Source associée -->
          <div class="mt-2 text-xs text-zinc-500">
            Source :
            <a
              :href="source"
              target="_blank"
              rel="noreferrer"
              class="underline underline-offset-4 hover:text-zinc-300"
            >
              {{ source }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Exemples -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold tracking-tight text-zinc-100">
        Exemples
      </h2>

      <div
        class="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden"
      >
        <!-- Tabs -->
        <div class="flex border-b border-zinc-800">
          <button
            @click="activeTab = 'preview'"
            :class="[
              'px-5 py-3 text-sm transition',
              activeTab === 'preview'
                ? 'text-zinc-100 border-b-2 border-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200',
            ]"
          >
            Rendu
          </button>

          <button
            @click="activeTab = 'code'"
            :class="[
              'px-5 py-3 text-sm transition',
              activeTab === 'code'
                ? 'text-zinc-100 border-b-2 border-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200',
            ]"
          >
            Code
          </button>
        </div>

        <!-- Content -->
        <div class="p-6">
          <!-- RENDU -->
          <div v-if="activeTab === 'preview'" class="space-y-4">
            <div class="text-sm text-zinc-400">
              Comparaison entre GET et POST pour la transmission de données sensibles
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- GET - Insécurisé -->
              <div class="rounded-xl border border-red-900 bg-zinc-950 p-5">
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-red-400 text-xl">✗</span>
                  <h4 class="font-semibold text-red-300">GET - Non sécurisé</h4>
                </div>

                <div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800 mb-3">
                  <div class="mb-3">
                    <div class="bg-zinc-800 rounded px-3 py-2 text-xs font-mono text-zinc-400 overflow-x-auto">
                      https://site.com/login?<span class="text-red-400">email=user@mail.com&password=secret123</span>
                    </div>
                  </div>
                  
                  <form class="space-y-2">
                    <input
                      type="text"
                      placeholder="Email"
                      class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
                    />
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
                    />
                    <button class="w-full py-2 bg-zinc-700 rounded text-sm">
                      Se connecter
                    </button>
                  </form>
                </div>

                <div class="space-y-2 text-xs">
                  <div class="flex items-start gap-2 text-red-300">
                    <span>✗</span>
                    <span>Données visibles dans l'URL</span>
                  </div>
                  <div class="flex items-start gap-2 text-red-300">
                    <span>✗</span>
                    <span>Stocké dans l'historique</span>
                  </div>
                  <div class="flex items-start gap-2 text-red-300">
                    <span>✗</span>
                    <span>Visible dans les logs serveur</span>
                  </div>
                  <div class="flex items-start gap-2 text-red-300">
                    <span>✗</span>
                    <span>Partageable par erreur</span>
                  </div>
                </div>
              </div>

              <!-- POST - Sécurisé -->
              <div class="rounded-xl border border-green-900 bg-zinc-950 p-5">
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-green-400 text-xl">✓</span>
                  <h4 class="font-semibold text-green-300">POST - Sécurisé</h4>
                </div>

                <div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800 mb-3">
                  <div class="mb-3">
                    <div class="bg-zinc-800 rounded px-3 py-2 text-xs font-mono text-zinc-100 overflow-x-auto">
                      https://site.com/login
                    </div>
                  </div>
                  
                  <form class="space-y-2">
                    <input
                      type="text"
                      placeholder="Email"
                      class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
                    />
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
                    />
                    <button class="w-full py-2 bg-zinc-700 rounded text-sm">
                      Se connecter
                    </button>
                  </form>

                  <div class="mt-2 text-xs text-zinc-500 italic">
                    Données envoyées dans le corps de la requête
                  </div>
                </div>

                <div class="space-y-2 text-xs">
                  <div class="flex items-start gap-2 text-green-300">
                    <span>✓</span>
                    <span>Données cachées de l'URL</span>
                  </div>
                  <div class="flex items-start gap-2 text-green-300">
                    <span>✓</span>
                    <span>Pas dans l'historique</span>
                  </div>
                  <div class="flex items-start gap-2 text-green-300">
                    <span>✓</span>
                    <span>Protégé dans les logs</span>
                  </div>
                  <div class="flex items-start gap-2 text-green-300">
                    <span>✓</span>
                    <span>Impossible à partager</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CODE -->
          <div v-else>
            <pre
              class="rounded-xl bg-zinc-950 p-5 overflow-x-auto text-sm text-zinc-100"
            >
<code>
&lt;!-- ❌ MAUVAISE PRATIQUE - Méthode GET avec données sensibles --&gt;
&lt;form action=&quot;/login&quot; method=&quot;GET&quot;&gt;
  &lt;input type=&quot;text&quot; name=&quot;email&quot; /&gt;
  &lt;input type=&quot;password&quot; name=&quot;password&quot; /&gt;
  &lt;button type=&quot;submit&quot;&gt;Connexion&lt;/button&gt;
&lt;/form&gt;

&lt;!-- Résultat: https://site.com/login?email=user@mail.com&amp;password=secret123 --&gt;
&lt;!-- Les données sont visibles dans l'URL et l'historique du navigateur --&gt;


&lt;!-- ✓ BONNE PRATIQUE - Méthode POST --&gt;
&lt;form action=&quot;/login&quot; method=&quot;POST&quot;&gt;
  &lt;input type=&quot;text&quot; name=&quot;email&quot; /&gt;
  &lt;input type=&quot;password&quot; name=&quot;password&quot; /&gt;
  &lt;button type=&quot;submit&quot;&gt;Connexion&lt;/button&gt;
&lt;/form&gt;

&lt;!-- Résultat: https://site.com/login --&gt;
&lt;!-- Les données sont envoyées dans le corps de la requête, invisible dans l'URL --&gt;


&lt;!-- Exemple avec JavaScript/Fetch --&gt;
&lt;!-- ❌ MAUVAIS - GET avec paramètres visibles --&gt;
fetch(`/api/login?email=${email}&amp;password=${password}`)

&lt;!-- ✓ BON - POST avec corps de requête --&gt;
fetch('/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email,
    password: password
  })
})


&lt;!-- Règles à suivre: --&gt;
✓ Utiliser POST pour:
  - Formulaires de connexion
  - Données personnelles
  - Informations de paiement
  - Mots de passe
  - Tokens de sécurité

✓ Utiliser GET pour:
  - Recherches publiques
  - Filtres non sensibles
  - Pagination
  - Liens partageables


&lt;!-- Configuration serveur pour bloquer GET sur endpoints sensibles --&gt;
// Express.js
app.post('/login', (req, res) =&gt; {
  // Accepte uniquement POST
})

app.get('/login', (req, res) =&gt; {
  res.status(405).send('Méthode non autorisée')
})
</code>
</pre>

            <p class="mt-3 text-xs text-zinc-500">
              Les données sensibles ne doivent jamais être transmises via la méthode GET car elles apparaissent dans l'URL et sont stockées dans l'historique du navigateur, les logs serveur, et peuvent être interceptées. Utilisez toujours POST avec HTTPS pour les données sensibles.
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>

  <section v-else class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
    <h1 class="text-lg font-semibold text-zinc-100">Règle introuvable</h1>
    <p class="mt-2 text-sm text-zinc-400">
      Vérifiez que la règle existe dans
      <code class="text-zinc-300">rules.json</code>.
    </p>
  </section>
</template>

<style scoped>
.scrollbar-light {
  scrollbar-color: transparent transparent;
  border-radius: 4px;
}
.scrollbar-dark {
  scrollbar-color: transparent transparent;
  border-radius: 4px;
}
.scrollbar-light:hover {
  scrollbar-color: #a3a3a3 transparent;
  border-radius: 4px;
}
.scrollbar-dark:hover {
  scrollbar-color: #4d4d4d transparent;
  border-radius: 4px;
}
</style>