<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 65
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
              Comparaison entre un produit disponible et un produit épuisé.
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              <!-- Produit Disponible -->
              <div
                class="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden"
              >
                <div class="h-40 bg-zinc-800 flex items-center justify-center">
                  <span class="text-zinc-500">Image Produit</span>
                </div>
                <div class="p-4 space-y-3">
                  <h3 class="font-medium text-zinc-100">T-Shirt Basique</h3>
                  <div class="text-sm text-zinc-400">25,00 €</div>
                  <button
                    class="w-full rounded-lg bg-zinc-100 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200 transition"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>

              <!-- Produit Indisponible -->
              <div
                class="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden opacity-75"
              >
                <div
                  class="relative h-40 bg-zinc-900 flex items-center justify-center"
                >
                  <span class="text-zinc-600">Image Produit</span>
                  <div
                    class="absolute inset-0 bg-black/40 flex items-center justify-center"
                  >
                    <span
                      class="px-3 py-1 rounded-full bg-zinc-800/90 text-xs font-medium text-zinc-300 border border-zinc-700"
                    >
                      Épuisé
                    </span>
                  </div>
                </div>
                <div class="p-4 space-y-3">
                  <h3 class="font-medium text-zinc-400">Sweat à capuche</h3>
                  <div class="text-sm text-zinc-500 line-through">45,00 €</div>
                  <button
                    disabled
                    class="w-full rounded-lg bg-zinc-800 py-2 text-sm font-medium text-zinc-500 cursor-not-allowed border border-zinc-700"
                  >
                    Rupture de stock
                  </button>
                  <p class="text-xs text-red-400 mt-1">
                    Ce produit n'est plus disponible actuellement.
                  </p>
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
&lt;!-- Produit Indisponible : Traitement visuel et textuel --&gt;
&lt;div class=&quot;rounded-xl border border-zinc-800 bg-zinc-950 opacity-75&quot;&gt;
  
  &lt;!-- Image avec calque assombrissant et badge --&gt;
  &lt;div class=&quot;relative h-40 bg-zinc-900 flex items-center justify-center&quot;&gt;
    &lt;img src=&quot;...&quot; alt=&quot;Sweat à capuche&quot; class=&quot;grayscale opacity-50&quot; /&gt;
    
    &lt;!-- Badge visuel explicite --&gt;
    &lt;div class=&quot;absolute inset-0 flex items-center justify-center&quot;&gt;
      &lt;span class=&quot;px-3 py-1 bg-zinc-800 text-xs font-medium text-zinc-300&quot;&gt;
        Épuisé
      &lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class=&quot;p-4 space-y-3&quot;&gt;
    &lt;h3 class=&quot;font-medium text-zinc-400&quot;&gt;Sweat à capuche&lt;/h3&gt;
    &lt;div class=&quot;text-sm text-zinc-500 line-through&quot;&gt;45,00 €&lt;/div&gt;

    &lt;!-- Bouton désactivé avec texte clair --&gt;
    &lt;button 
      disabled 
      class=&quot;w-full bg-zinc-800 py-2 text-sm text-zinc-500 cursor-not-allowed&quot;
    &gt;
      Rupture de stock
    &lt;/button&gt;

    &lt;!-- Information textuelle complémentaire --&gt;
    &lt;p class=&quot;text-xs text-red-400&quot;&gt;
      Ce produit n'est plus disponible actuellement.
    &lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code>
</pre>
            <p class="mt-3 text-xs text-zinc-500">
              Notez l'utilisation de la classe <code>opacity-75</code> pour le
              conteneur, <code>grayscale</code> pour l'image, et surtout les
              mentions textuelles explicites ("Épuisé", "Rupture de stock").
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