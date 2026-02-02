<script setup>
import { ref } from 'vue'
import { getRuleById } from '~/data/rules'

const ruleId = 60
const rule = getRuleById(ruleId)
const activeTab = ref('preview')

// Logique pour l'exemple interactif
const cards = ref([{ id: 1, type: 'Visa', last4: '4242', expiry: '09/26' }])

const deleteCard = (id) => {
  if (confirm('Supprimer ce moyen de paiement ?')) {
    cards.value = cards.value.filter((c) => c.id !== id)
  }
}
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
              Exemple d'interface de gestion des moyens de paiement
            </div>

            <div
              class="rounded-xl border border-zinc-800 bg-zinc-950 p-6 max-w-md mx-auto"
            >
              <h3 class="text-base font-semibold text-zinc-100 mb-6">
                Mes cartes enregistrées
              </h3>

              <div v-if="cards.length > 0" class="space-y-4">
                <div
                  v-for="card in cards"
                  :key="card.id"
                  class="p-4 border border-zinc-800 rounded-lg bg-zinc-900/50 flex items-center justify-between"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold text-zinc-400 border border-zinc-700"
                    >
                      {{ card.type }}
                    </div>
                    <div>
                      <p class="text-sm font-medium text-zinc-100">
                        •••• •••• •••• {{ card.last4 }}
                      </p>
                      <p class="text-xs text-zinc-500">
                        Expire fin : {{ card.expiry }}
                      </p>
                    </div>
                  </div>

                  <div class="flex gap-2">
                    <button
                      class="p-2 text-zinc-400 hover:text-zinc-100 transition"
                      title="Modifier"
                    >
                      ✎
                    </button>
                    <button
                      @click="deleteCard(card.id)"
                      class="p-2 text-zinc-400 hover:text-red-400 transition"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-4">
                <p class="text-sm text-zinc-500">
                  Aucun moyen de paiement enregistré.
                </p>
              </div>

              <button
                class="mt-6 w-full py-2 border border-zinc-700 text-zinc-300 rounded-lg text-sm hover:bg-zinc-900 transition"
              >
                + Ajouter une carte
              </button>
            </div>
          </div>

          <div v-else>
            <pre
              class="rounded-xl bg-zinc-950 p-5 overflow-x-auto text-sm text-zinc-100"
            ><code>&lt;!-- Règle 60 : Interface de gestion du compte --&gt;
&lt;section id="payment-methods"&gt;
  &lt;h2&gt;Mes moyens de paiement&lt;/h2&gt;
  &lt;div class="card-item"&gt;
    &lt;span&gt;Visa terminant par 4242&lt;/span&gt;
    &lt;div class="actions"&gt;
      &lt;button aria-label="Modifier la carte"&gt;Modifier&lt;/button&gt;
      &lt;button aria-label="Supprimer la carte"&gt;Supprimer&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;</code></pre>
            <p class="mt-3 text-xs text-zinc-500">
              L'utilisateur doit pouvoir supprimer ses données aussi facilement
              qu'il les a enregistrées.
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
