<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 67
const rule = getRuleById(ruleId)
const activeTab = ref('preview')

// État pour la simulation du formulaire
const isSubmitted = ref(false)

const submitForm = () => {
  isSubmitted.value = true
}

const resetForm = () => {
  isSubmitted.value = false
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
              Essayez de soumettre ce formulaire de réclamation factice.
            </div>

            <div class="max-w-md mx-auto">
              <!-- État Formulaire -->
              <div
                v-if="!isSubmitted"
                class="rounded-xl border border-zinc-700 bg-zinc-950 p-6 space-y-4"
              >
                <div class="space-y-2">
                  <label class="text-sm font-medium text-zinc-300">
                    Sujet de la réclamation
                  </label>
                  <select
                    class="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200"
                  >
                    <option>Problème de facturation</option>
                    <option>Service non conforme</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-zinc-300">
                    Votre message
                  </label>
                  <textarea
                    rows="3"
                    class="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200"
                    placeholder="Décrivez votre problème..."
                  ></textarea>
                </div>
                <button
                  @click="submitForm"
                  class="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                  Envoyer la réclamation
                </button>
              </div>

              <!-- État Succès (Accusé de réception) -->
              <div
                v-else
                class="rounded-xl border border-green-900/50 bg-green-950/20 p-6 text-center animate-in fade-in zoom-in duration-300"
              >
                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-900/50 mb-4"
                >
                  <span class="text-green-400 text-xl">✓</span>
                </div>
                <h3 class="text-lg font-semibold text-green-400">
                  Réclamation envoyée
                </h3>
                <p class="mt-2 text-sm text-zinc-300">
                  Nous avons bien reçu votre demande. Un email de confirmation
                  vient de vous être envoyé.
                </p>

                <div
                  class="mt-6 rounded bg-zinc-900/50 p-4 border border-zinc-800"
                >
                  <div class="text-xs uppercase text-zinc-500 tracking-wider">
                    Numéro de ticket
                  </div>
                  <div class="text-xl font-mono text-zinc-200 mt-1">
                    #REQ-83920
                  </div>
                  <div class="text-xs text-zinc-400 mt-2">
                    Délai de traitement estimé : 24h à 48h.
                  </div>
                </div>

                <button
                  @click="resetForm"
                  class="mt-6 text-xs text-zinc-500 underline hover:text-zinc-300"
                >
                  Réinitialiser la démo
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
&lt;!-- Écran d'accusé de réception après soumission --&gt;
&lt;div class=&quot;bg-green-50 p-6 text-center border border-green-200 rounded-xl&quot;&gt;
  
  &lt;!-- Confirmation visuelle immédiate --&gt;
  &lt;h3 class=&quot;text-lg font-semibold text-green-800&quot;&gt;
    Réclamation envoyée avec succès
  &lt;/h3&gt;
  
  &lt;p class=&quot;mt-2 text-sm text-green-700&quot;&gt;
    Nous avons bien reçu votre demande. 
    Un email de confirmation a été envoyé à 
    &lt;strong&gt;client@email.com&lt;/strong&gt;.
  &lt;/p&gt;

  &lt;!-- Éléments de traçabilité (Essentiel pour la règle) --&gt;
  &lt;div class=&quot;mt-4 bg-white p-4 rounded shadow-sm inline-block&quot;&gt;
    &lt;div class=&quot;text-xs uppercase text-gray-500&quot;&gt;
      Votre numéro de ticket
    &lt;/div&gt;
    &lt;div class=&quot;text-xl font-mono font-bold text-gray-900&quot;&gt;
      #REQ-83920
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;p class=&quot;mt-4 text-xs text-gray-500&quot;&gt;
    Notre équipe s'engage à vous répondre sous 48h.
  &lt;/p&gt;

&lt;/div&gt;
</code>
</pre>
            <p class="mt-3 text-xs text-zinc-500">
              L'accusé de réception doit contenir : la confirmation de l'envoi,
              une référence unique (ticket) et idéalement un délai de traitement
              estimé.
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