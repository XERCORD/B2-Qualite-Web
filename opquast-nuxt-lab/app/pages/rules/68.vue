<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 68
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
                :alt="`Exemple d’application de la règle ${rule.id}`"
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
              Exemple d'affichage de l'origine sur une fiche produit.
            </div>

            <div
              class="max-w-sm mx-auto rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden"
            >
              <!-- Photo Produit -->
              <div class="relative h-48 bg-zinc-800">
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-zinc-600">Photo Pull Marin</span>
                </div>
                <!-- Badge Origine Rapide -->
                <div class="absolute top-3 left-3">
                  <span
                    class="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm backdrop-blur-sm"
                  >
                    🇫🇷 Fabriqué en France
                  </span>
                </div>
              </div>

              <!-- Contenu -->
              <div class="p-5 space-y-4">
                <div>
                  <h3 class="text-lg font-semibold text-zinc-100">
                    Pull Marin Authentique
                  </h3>
                  <div class="text-zinc-400 text-sm">120,00 €</div>
                </div>

                <!-- Bloc Traçabilité -->
                <div class="rounded-lg bg-zinc-900/50 p-3 border border-zinc-800">
                  <h4
                    class="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2"
                  >
                    Traçabilité & Origine
                  </h4>
                  <ul class="space-y-2 text-sm">
                    <li class="flex justify-between">
                      <span class="text-zinc-400">Tricotage</span>
                      <span class="text-zinc-200 font-medium">
                        Bretagne, France
                      </span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-zinc-400">Laine</span>
                      <span class="text-zinc-200 font-medium">
                        Mérinos d'Arles
                      </span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-zinc-400">Confection</span>
                      <span class="text-zinc-200 font-medium">
                        Nantes, France
                      </span>
                    </li>
                  </ul>
                </div>

                <button
                  class="w-full rounded-lg bg-zinc-100 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition"
                >
                  Ajouter au panier
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
&lt;!-- Fiche produit avec mise en avant de l'origine --&gt;
&lt;div class=&quot;relative&quot;&gt;
  &lt;!-- Badge visible directement sur l'image --&gt;
  &lt;div class=&quot;absolute top-3 left-3&quot;&gt;
    &lt;span class=&quot;bg-white text-zinc-900 px-3 py-1 rounded-full text-xs font-bold&quot;&gt;
      🇫🇷 Fabriqué en France
    &lt;/span&gt;
  &lt;/div&gt;
  &lt;img src=&quot;/pull-marin.jpg&quot; alt=&quot;Pull Marin&quot; /&gt;
&lt;/div&gt;

&lt;div class=&quot;p-5 space-y-4&quot;&gt;
  &lt;h3&gt;Pull Marin Authentique&lt;/h3&gt;

  &lt;!-- Bloc de détails techniques (Rassurance) --&gt;
  &lt;div class=&quot;bg-zinc-900 p-3 rounded border border-zinc-800&quot;&gt;
    &lt;h4 class=&quot;text-xs uppercase text-zinc-500 mb-2&quot;&gt;
      Provenance
    &lt;/h4&gt;
    &lt;ul class=&quot;text-sm space-y-1&quot;&gt;
      &lt;li class=&quot;flex justify-between&quot;&gt;
        &lt;span class=&quot;text-zinc-400&quot;&gt;Tricotage :&lt;/span&gt;
        &lt;span class=&quot;text-zinc-100&quot;&gt;Bretagne, France&lt;/span&gt;
      &lt;/li&gt;
      &lt;li class=&quot;flex justify-between&quot;&gt;
        &lt;span class=&quot;text-zinc-400&quot;&gt;Matière première :&lt;/span&gt;
        &lt;span class=&quot;text-zinc-100&quot;&gt;Arles (Laine)&lt;/span&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code>
</pre>
            <p class="mt-3 text-xs text-zinc-500">
              L'information doit être visible (badge) et détaillée (liste). On
              distingue ici le lieu de fabrication (Bretagne) de l'origine de la
              matière première (Arles), ce qui renforce la crédibilité.
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