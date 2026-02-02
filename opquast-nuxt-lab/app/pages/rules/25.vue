<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 25
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
              Exemple de configuration Referrer-Policy pour protéger la vie privée
            </div>

            <div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <h3 class="text-lg font-semibold text-zinc-100 mb-4">
                Configuration Referrer-Policy
              </h3>

              <div class="space-y-4">
                <div class="bg-zinc-900 rounded-lg p-4 border border-green-900">
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-green-900 rounded-lg flex items-center justify-center text-green-300 shrink-0">
                      ✓
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-green-300 mb-1">
                        Recommandé: strict-origin-when-cross-origin
                      </div>
                      <div class="text-sm text-zinc-400 mb-2">
                        Envoie l'origine complète pour les requêtes same-origin, seulement l'origine pour HTTPS vers HTTPS, et rien pour HTTPS vers HTTP
                      </div>
                      <code class="text-xs bg-zinc-950 px-2 py-1 rounded text-green-300">
                        Referrer-Policy: strict-origin-when-cross-origin
                      </code>
                    </div>
                  </div>
                </div>

                <div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 shrink-0">
                      •
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-zinc-100 mb-1">
                        Alternative: no-referrer-when-downgrade
                      </div>
                      <div class="text-sm text-zinc-400 mb-2">
                        Comportement par défaut - envoie le referrer complet sauf pour HTTPS vers HTTP
                      </div>
                      <code class="text-xs bg-zinc-950 px-2 py-1 rounded text-zinc-300">
                        Referrer-Policy: no-referrer-when-downgrade
                      </code>
                    </div>
                  </div>
                </div>

                <div class="bg-zinc-900 rounded-lg p-4 border border-yellow-900">
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-yellow-900 rounded-lg flex items-center justify-center text-yellow-300 shrink-0">
                      ⚠
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-yellow-300 mb-1">
                        Maximum de protection: no-referrer
                      </div>
                      <div class="text-sm text-zinc-400 mb-2">
                        N'envoie aucune information de référence - peut casser certaines fonctionnalités
                      </div>
                      <code class="text-xs bg-zinc-950 px-2 py-1 rounded text-yellow-300">
                        Referrer-Policy: no-referrer
                      </code>
                    </div>
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
&lt;!-- Configuration dans le HTML --&gt;
&lt;meta name=&quot;referrer&quot; content=&quot;strict-origin-when-cross-origin&quot;&gt;

&lt;!-- Configuration via en-tête HTTP --&gt;
Referrer-Policy: strict-origin-when-cross-origin

&lt;!-- Configuration sur des liens spécifiques --&gt;
&lt;a href=&quot;https://externe.com&quot; referrerpolicy=&quot;no-referrer&quot;&gt;
  Lien externe
&lt;/a&gt;

&lt;!-- Configuration dans Nginx --&gt;
add_header Referrer-Policy &quot;strict-origin-when-cross-origin&quot; always;

&lt;!-- Configuration dans Apache --&gt;
Header always set Referrer-Policy &quot;strict-origin-when-cross-origin&quot;

&lt;!-- Valeurs possibles de Referrer-Policy: --&gt;
- no-referrer
  Aucune information de référence n'est envoyée

- no-referrer-when-downgrade
  Envoie le referrer complet sauf pour HTTPS → HTTP

- origin
  Envoie uniquement l'origine (domaine)

- origin-when-cross-origin
  Envoie l'URL complète en same-origin, l'origine sinon

- same-origin
  Envoie le referrer uniquement pour same-origin

- strict-origin
  Envoie l'origine sauf pour HTTPS → HTTP

- strict-origin-when-cross-origin (recommandé)
  Combine les avantages de protection et compatibilité

- unsafe-url
  Envoie toujours l'URL complète (non recommandé)
</code>
</pre>

            <p class="mt-3 text-xs text-zinc-500">
              La politique Referrer-Policy contrôle quelles informations de navigation sont partagées lorsqu'un utilisateur clique sur un lien ou charge une ressource externe, protégeant ainsi la vie privée des utilisateurs.
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