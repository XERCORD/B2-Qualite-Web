<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 23
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
              Exemple de gestion des sessions actives pour contrôler l'accès depuis différents appareils
            </div>

            <div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <h3 class="text-lg font-semibold text-zinc-100 mb-4">
                Sessions Actives
              </h3>

              <div class="space-y-3">
                <div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                  <div class="flex items-start justify-between gap-4">
                    <div class="flex items-start gap-3">
                      <div class="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400">
                        💻
                      </div>
                      <div>
                        <div class="font-medium text-zinc-100">Windows PC</div>
                        <div class="text-sm text-zinc-400">Chrome • Paris, France</div>
                        <div class="text-xs text-zinc-500 mt-1">Connecté maintenant</div>
                      </div>
                    </div>
                    <span class="text-xs px-2 py-1 bg-green-900 text-green-300 rounded-full">
                      Actif
                    </span>
                  </div>
                </div>

                <div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                  <div class="flex items-start justify-between gap-4">
                    <div class="flex items-start gap-3">
                      <div class="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400">
                        📱
                      </div>
                      <div>
                        <div class="font-medium text-zinc-100">iPhone 14</div>
                        <div class="text-sm text-zinc-400">Safari • Paris, France</div>
                        <div class="text-xs text-zinc-500 mt-1">Il y a 2 heures</div>
                      </div>
                    </div>
                    <button class="text-xs px-3 py-1 bg-red-900 text-red-300 rounded hover:bg-red-800 transition-colors">
                      Déconnecter
                    </button>
                  </div>
                </div>

                <div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                  <div class="flex items-start justify-between gap-4">
                    <div class="flex items-start gap-3">
                      <div class="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400">
                        💻
                      </div>
                      <div>
                        <div class="font-medium text-zinc-100">MacBook Pro</div>
                        <div class="text-sm text-zinc-400">Firefox • Lyon, France</div>
                        <div class="text-xs text-zinc-500 mt-1">Il y a 1 jour</div>
                      </div>
                    </div>
                    <button class="text-xs px-3 py-1 bg-red-900 text-red-300 rounded hover:bg-red-800 transition-colors">
                      Déconnecter
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-zinc-800">
                <button class="text-sm text-red-400 hover:text-red-300 transition-colors">
                  Déconnecter toutes les autres sessions
                </button>
              </div>
            </div>
          </div>

          <!-- CODE -->
          <div v-else>
            <pre
              class="rounded-xl bg-zinc-950 p-5 overflow-x-auto text-sm text-zinc-100"
            >
<code>
&lt;!-- Liste des sessions actives --&gt;
&lt;div class=&quot;space-y-4&quot;&gt;
  &lt;h3 class=&quot;text-lg font-semibold&quot;&gt;Sessions Actives&lt;/h3&gt;
  
  &lt;div class=&quot;space-y-3&quot;&gt;
    &lt;!-- Session active --&gt;
    &lt;div class=&quot;bg-zinc-900 rounded-lg p-4 border border-zinc-800&quot;&gt;
      &lt;div class=&quot;flex items-start justify-between&quot;&gt;
        &lt;div class=&quot;flex items-start gap-3&quot;&gt;
          &lt;div class=&quot;w-10 h-10 bg-zinc-800 rounded-lg&quot;&gt;💻&lt;/div&gt;
          &lt;div&gt;
            &lt;div class=&quot;font-medium text-zinc-100&quot;&gt;Windows PC&lt;/div&gt;
            &lt;div class=&quot;text-sm text-zinc-400&quot;&gt;Chrome • Paris, France&lt;/div&gt;
            &lt;div class=&quot;text-xs text-zinc-500&quot;&gt;Connecté maintenant&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;span class=&quot;text-xs px-2 py-1 bg-green-900 text-green-300 rounded-full&quot;&gt;
          Actif
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- Autres sessions --&gt;
    &lt;div class=&quot;bg-zinc-900 rounded-lg p-4 border border-zinc-800&quot;&gt;
      &lt;div class=&quot;flex items-start justify-between&quot;&gt;
        &lt;div class=&quot;flex items-start gap-3&quot;&gt;
          &lt;div class=&quot;w-10 h-10 bg-zinc-800 rounded-lg&quot;&gt;📱&lt;/div&gt;
          &lt;div&gt;
            &lt;div class=&quot;font-medium text-zinc-100&quot;&gt;iPhone 14&lt;/div&gt;
            &lt;div class=&quot;text-sm text-zinc-400&quot;&gt;Safari • Paris, France&lt;/div&gt;
            &lt;div class=&quot;text-xs text-zinc-500&quot;&gt;Il y a 2 heures&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;button class=&quot;text-xs px-3 py-1 bg-red-900 text-red-300 rounded&quot;&gt;
          Déconnecter
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Action globale --&gt;
  &lt;button class=&quot;text-sm text-red-400&quot;&gt;
    Déconnecter toutes les autres sessions
  &lt;/button&gt;
&lt;/div&gt;
</code>
</pre>

            <p class="mt-3 text-xs text-zinc-500">
              La gestion des sessions permet aux utilisateurs de voir et contrôler tous les appareils connectés à leur compte, améliorant ainsi la sécurité en cas d'accès non autorisé.
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