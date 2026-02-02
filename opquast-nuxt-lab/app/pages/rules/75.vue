<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 75
const rule = getRuleById(ruleId)
const activeTab = ref('preview')

</script>

<template>
  <section v-if="rule" class="space-y-6">
    <!-- Header -->
    <header class="space-y-3">
      <button @click="$router.back()" class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition">
        ← Retour
      </button>
      <div class="text-sm text-zinc-400">Règle n° {{ rule.id }}</div>
      <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">{{ rule.title }}</h1>
      <div class="text-base sm:text-sm tracking-tight text-zinc-300">{{ rule.description }}</div>
      <div class="flex flex-wrap gap-2">
        <span v-for="tag in rule.tags" :key="tag" class="text-xs rounded-full border border-zinc-800 bg-zinc-900/30 px-2.5 py-1 text-zinc-300">
          {{ tag }}
        </span>
      </div>
      <div v-if="rule.authors && rule.authors.length" class="text-sm text-zinc-400">
        Écrit par <span class="text-zinc-300">{{ rule.authors.join(', ') }}</span>
      </div>
    </header>

    <!-- Objectifs -->
    <section class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <h2 class="text-lg font-semibold tracking-tight text-zinc-100">Objectifs</h2>
      <ul class="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-300">
        <li v-for="o in rule.objectives" :key="o">{{ o }}</li>
      </ul>
    </section>

    <!-- Mise en œuvre -->
    <section class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <h2 class="text-lg font-semibold tracking-tight text-zinc-100">Mise en œuvre</h2>
      <p v-if="rule.implementationIntro" class="mt-3 text-sm text-zinc-400">{{ rule.implementationIntro }}</p>
      <ul class="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-300">
        <li v-for="x in rule.implementation" :key="x">{{ x }}</li>
      </ul>
    </section>

    <!-- Contrôle -->
    <section class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <h2 class="text-lg font-semibold tracking-tight text-zinc-100">Contrôle</h2>
      <ul class="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-300">
        <li v-for="c in rule.control" :key="c">{{ c }}</li>
      </ul>
    </section>

    <!-- Screenshots -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold tracking-tight text-zinc-100">Screenshots</h2>
      <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-light">
        <div v-for="(source, index) in rule.screenshotsSources" :key="source + index" class="shrink-0 w-[280px] sm:w-[340px]">
          <div class="aspect-[16/10] rounded-2xl border border-zinc-800 bg-zinc-900/20 overflow-hidden flex items-center justify-center">
            <a :href="`/screenshots/rule-${rule.id}/screenshot-${index + 1}.png`" target="_blank" class="block cursor-zoom-in">
              <img :src="`/screenshots/rule-${rule.id}/screenshot-${index + 1}.png`"
                   :alt="`Exemple ${index+1} règle ${rule.id}`"
                   class="h-full w-full object-cover"
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='block'" />
            </a>
            <div class="hidden text-center px-4">
              <div class="text-sm text-zinc-300 font-medium">Screenshot à ajouter</div>
              <div class="mt-1 text-xs text-zinc-500">/screenshots/rule-{{rule.id}}/screenshot-{{index+1}}.png</div>
            </div>
          </div>
          <div class="mt-2 text-xs text-zinc-500">Source : <a :href="source" target="_blank" class="underline hover:text-zinc-300">{{ source }}</a></div>
        </div>
      </div>
    </section>

    <!-- EXEMPLES (C'est ici qu'on personnalise par règle) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold tracking-tight text-zinc-100">Exemple codé</h2>
      <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
        <div class="flex border-b border-zinc-800">
          <button @click="activeTab = 'preview'" :class="['px-5 py-3 text-sm transition', activeTab === 'preview' ? 'text-zinc-100 border-b-2 border-zinc-100' : 'text-zinc-400 hover:text-zinc-200']">Rendu</button>
          <button @click="activeTab = 'code'" :class="['px-5 py-3 text-sm transition', activeTab === 'code' ? 'text-zinc-100 border-b-2 border-zinc-100' : 'text-zinc-400 hover:text-zinc-200']">Code</button>
        </div>

        <div class="p-6">
          <!-- CONTENU DE L'EXEMPLE POUR LA RÈGLE 72 -->
          <div v-if="activeTab === 'preview'" class="space-y-4">
            <div class="text-sm text-zinc-400">Mécanisme de double saisie pour éviter les erreurs de frappe.</div>
            <form class="max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
              <div class="space-y-1.5">
                <label for="pwd" class="block text-sm font-medium text-zinc-200">Mot de passe</label>
                <input type="password" id="pwd" class="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none" />
              </div>
              <div class="space-y-1.5">
                <label for="pwd-confirm" class="block text-sm font-medium text-zinc-200">Confirmez le mot de passe</label>
                <input type="password" id="pwd-confirm" class="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none" />
              </div>
            </form>
          </div>
          <div v-else>
  <pre class="rounded-xl bg-zinc-950 p-5 overflow-x-auto text-sm text-zinc-100"><code>&lt;!-- Règle 75 : Double saisie --&gt;
&lt;label for="pwd"&gt;Mot de passe&lt;/label&gt;
&lt;input type="password" id="pwd" /&gt;

&lt;label for="pwd-confirm"&gt;Confirmez le mot de passe&lt;/label&gt;
&lt;input type="password" id="pwd-confirm" /&gt;</code></pre>
          </div>
          <!-- FIN CONTENU EXEMPLE -->
        </div>
      </div>
    </section>
  </section>

  <!-- Erreur si règle non trouvée -->
  <section v-else class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
    <h1 class="text-lg font-semibold text-zinc-100">Règle introuvable</h1>
    <p class="mt-2 text-sm text-zinc-400">Vérifiez rules.json</p>
  </section>
</template>

<style scoped>
.scrollbar-light { scrollbar-color: transparent transparent; }
.scrollbar-light:hover { scrollbar-color: #a3a3a3 transparent; }
</style>