<script setup>
import { ref } from 'vue'
import { getRuleById } from '~/data/rules'

const ruleId = 62
const rule = getRuleById(ruleId)
const activeTab = ref('preview')

// Données fictives pour l'exemple
const orders = [
  { id: 'FAC-2026-001', date: '12/01/2026', total: '45,00 €', status: 'Payée' },
  {
    id: 'FAC-2026-014',
    date: '25/01/2026',
    total: '129,99 €',
    status: 'Payée',
  },
]
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
      <ul class="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-300">
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
      <ul class="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-300">
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
            <a
              :href="`/screenshots/rule-${rule.id}/screenshot-${index + 1}.png`"
              target="_blank"
              rel="noreferrer"
              class="block cursor-zoom-in"
            >
              <img
                :src="`/screenshots/rule-${rule.id}/screenshot-${index + 1}.png`"
                :alt="`Exemple d’application de la règle ${rule.id}`"
                class="h-full w-full object-cover"
                onerror="
                  this.style.display = 'none'
                  this.nextElementSibling.style.display = 'block'
                "
              />
              <div class="hidden text-center px-4">
                <div class="text-sm text-zinc-300 font-medium">
                  Screenshot à ajouter
                </div>
                <div class="mt-1 text-xs text-zinc-500">
                  Exemple réel attendu
                </div>
              </div>
            </a>
          </div>
          <div class="mt-2 text-xs text-zinc-500">
            Source :
            <a
              :href="source"
              target="_blank"
              class="underline hover:text-zinc-300"
              >{{ source }}</a
            >
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
          <div v-if="activeTab === 'preview'" class="space-y-4">
            <div class="text-sm text-zinc-400">
              Exemple d'interface de téléchargement de factures
            </div>

            <div
              class="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden max-w-2xl mx-auto"
            >
              <table class="w-full text-sm text-left">
                <thead
                  class="bg-zinc-900/50 text-zinc-400 border-b border-zinc-800"
                >
                  <tr>
                    <th class="px-4 py-3 font-medium">Référence</th>
                    <th class="px-4 py-3 font-medium">Date</th>
                    <th class="px-4 py-3 font-medium text-right">Montant</th>
                    <th class="px-4 py-3 font-medium text-center">Facture</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800">
                  <tr
                    v-for="order in orders"
                    :key="order.id"
                    class="text-zinc-300 hover:bg-zinc-900/30 transition"
                  >
                    <td class="px-4 py-4 font-mono text-xs">{{ order.id }}</td>
                    <td class="px-4 py-4">{{ order.date }}</td>
                    <td class="px-4 py-4 text-right">{{ order.total }}</td>
                    <td class="px-4 py-4 text-center">
                      <button
                        class="text-blue-400 hover:text-blue-300 underline underline-offset-4 flex items-center justify-center gap-1 mx-auto"
                      >
                        <span>PDF</span>
                        <span class="text-[10px]">📥</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-else>
            <pre
              class="rounded-xl bg-zinc-950 p-5 overflow-x-auto text-sm text-zinc-100"
            ><code>&lt;!-- Règle 62 : Accès aux factures --&gt;
&lt;table&gt;
  &lt;tr&gt;
    &lt;td&gt;Commande #2026-001&lt;/td&gt;
    &lt;td&gt;
      &lt;a href="/download/invoice-001.pdf" download&gt;
        Télécharger la facture (PDF)
      &lt;/a&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
            <p class="mt-3 text-xs text-zinc-500">
              L'implémentation repose sur un lien de téléchargement direct ou
              une génération de PDF à la volée sécurisée.
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>

  <section v-else class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
    <h1 class="text-lg font-semibold text-zinc-100">Règle introuvable</h1>
    <p class="mt-2 text-sm text-zinc-400">
      Vérifiez que la règle existe dans <code>rules.json</code>.
    </p>
  </section>
</template>

<style scoped>
.scrollbar-light {
  scrollbar-color: transparent transparent;
}
.scrollbar-light:hover {
  scrollbar-color: #4d4d4d transparent;
}
</style>
