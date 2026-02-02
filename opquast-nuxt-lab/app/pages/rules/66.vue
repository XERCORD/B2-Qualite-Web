<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 66
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
              Simulation d'un email de confirmation reçu par le client.
            </div>

            <div
              class="max-w-xl mx-auto rounded-lg overflow-hidden border border-zinc-700 bg-white text-zinc-900 font-sans"
            >
              <!-- Email Header -->
              <div class="bg-zinc-100 p-6 border-b border-zinc-200">
                <div class="font-bold text-lg text-indigo-600">
                  MaBoutique.com
                </div>
                <h3 class="mt-2 text-xl font-bold text-zinc-900">
                  Merci pour votre commande !
                </h3>
              </div>

              <!-- Email Body -->
              <div class="p-6 space-y-6">
                <p class="text-sm text-zinc-600">
                  Bonjour Timothé,<br />
                  Nous avons bien reçu votre commande et nous la préparons.
                  Voici votre reçu.
                </p>

                <div class="rounded bg-zinc-50 p-4 border border-zinc-100">
                  <div class="text-xs text-zinc-500 uppercase tracking-wide">
                    Référence commande
                  </div>
                  <div class="text-lg font-mono font-bold text-zinc-900">
                    #CMD-2026-8842
                  </div>
                  <div class="text-xs text-zinc-500 mt-1">
                    Date : 30 Janvier 2026
                  </div>
                </div>

                <!-- Order Summary -->
                <div>
                  <h4 class="font-semibold text-sm mb-3">
                    Récapitulatif
                  </h4>
                  <div class="space-y-3">
                    <div class="flex justify-between text-sm">
                      <span class="text-zinc-700">
                        1x Guide Opquast (Livre)
                      </span>
                      <span class="font-medium">29,00 €</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-zinc-700">1x T-shirt Dev (M)</span>
                      <span class="font-medium">25,00 €</span>
                    </div>
                    <div
                      class="flex justify-between text-sm border-t pt-2 mt-2 font-bold"
                    >
                      <span>Total payé</span>
                      <span>54,00 €</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Email Footer -->
              <div
                class="bg-zinc-50 p-4 text-center text-xs text-zinc-500 border-t border-zinc-100"
              >
                Une question ? Répondez à cet email pour contacter le support.
              </div>
            </div>
          </div>

          <!-- CODE -->
          <div v-else>
            <pre
              class="rounded-xl bg-zinc-950 p-5 overflow-x-auto text-sm text-zinc-100"
            >
<code>
&lt;!-- Structure type d'un email transactionnel (HTML email) --&gt;
&lt;div class=&quot;bg-white text-zinc-900 font-sans&quot;&gt;
  
  &lt;!-- En-tête --&gt;
  &lt;div class=&quot;bg-zinc-100 p-6&quot;&gt;
    &lt;h3 class=&quot;text-xl font-bold&quot;&gt;Merci pour votre commande !&lt;/h3&gt;
  &lt;/div&gt;

  &lt;!-- Corps du message --&gt;
  &lt;div class=&quot;p-6 space-y-6&quot;&gt;
    &lt;p&gt;Bonjour Timothé, voici le récapitulatif de votre achat.&lt;/p&gt;

    &lt;!-- Référence de la transaction (Point clé de la règle) --&gt;
    &lt;div class=&quot;bg-zinc-50 p-4 border&quot;&gt;
      &lt;div class=&quot;text-xs uppercase text-zinc-500&quot;&gt;Référence&lt;/div&gt;
      &lt;div class=&quot;text-lg font-mono font-bold&quot;&gt;#CMD-2026-8842&lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- Détail de la commande --&gt;
    &lt;div&gt;
      &lt;h4 class=&quot;font-semibold mb-3&quot;&gt;Récapitulatif&lt;/h4&gt;
      &lt;ul class=&quot;space-y-2&quot;&gt;
        &lt;li class=&quot;flex justify-between&quot;&gt;
          &lt;span&gt;1x Guide Opquast&lt;/span&gt;
          &lt;span&gt;29,00 €&lt;/span&gt;
        &lt;/li&gt;
        &lt;li class=&quot;flex justify-between font-bold border-t pt-2&quot;&gt;
          &lt;span&gt;Total&lt;/span&gt;
          &lt;span&gt;54,00 €&lt;/span&gt;
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Pied de page (Support) --&gt;
  &lt;div class=&quot;bg-zinc-50 p-4 text-xs text-center&quot;&gt;
    Besoin d'aide ? Contactez le support.
  &lt;/div&gt;
&lt;/div&gt;
</code>
</pre>
            <p class="mt-3 text-xs text-zinc-500">
              Note : En développement réel d'emails (newsletter/transactionnel),
              on utilise souvent des balises <code>&lt;table&gt;</code> pour la
              compatibilité, mais le contenu (Référence, Détails, Prix) reste le
              même.
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