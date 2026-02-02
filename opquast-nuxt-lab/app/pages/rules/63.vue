<script setup>
import { ref } from 'vue'
import { getRuleById } from '~/data/rules'

const ruleId = 63
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
              Simulation d'un e-mail de confirmation reçu
            </div>

            <div
              class="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden max-w-lg mx-auto shadow-2xl"
            >
              <!-- Header Email -->
              <div class="p-4 bg-zinc-900 border-b border-zinc-800">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white"
                  >
                    S
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-zinc-100 italic">
                      Service Client &lt;noreply@boutique.com&gt;
                    </p>
                    <p class="text-[10px] text-zinc-500 font-mono">
                      Objet : Votre facture pour la commande #CMD-782
                    </p>
                  </div>
                </div>
              </div>

              <!-- Body Email -->
              <div class="p-6 text-zinc-300 space-y-4 bg-white">
                <div class="text-zinc-800">
                  <p class="text-sm font-bold">Bonjour Romain Bourdot,</p>
                  <p class="text-xs mt-2 leading-relaxed">
                    Nous vous remercions pour votre confiance. Veuillez trouver
                    ci-joint votre facture concernant votre commande du
                    30/01/2026.
                  </p>
                </div>

                <div
                  class="p-3 border-2 border-dashed border-zinc-200 rounded-lg flex items-center justify-between bg-zinc-50"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-red-600 font-bold text-xs">PDF</span>
                    <span class="text-xs text-zinc-700 font-medium"
                      >Facture_CMD_782.pdf</span
                    >
                  </div>
                  <button
                    class="text-[10px] bg-zinc-800 text-white px-2 py-1 rounded"
                  >
                    Télécharger
                  </button>
                </div>

                <p class="text-[10px] text-zinc-400 text-center">
                  Boutique.com | 123 Rue du Web, Paris
                </p>
              </div>
            </div>
          </div>

          <div v-else>
            <pre
              class="rounded-xl bg-zinc-950 p-5 overflow-x-auto text-sm text-zinc-100"
            ><code>&lt;!-- Règle 63 : Logique d'envoi de mail --&gt;
&lt;?php
  // Exemple de déclenchement après paiement
  function sendInvoiceEmail($user_email, $order_id) {
    $subject = "Votre facture pour la commande #$order_id";
    $message = "Merci pour votre achat. Retrouvez votre facture en pièce jointe.";
    $headers = "From: noreply@boutique.com";
    $attachment = generatePDF($order_id);
    
    mail($user_email, $subject, $message, $headers);
  }
?&gt;</code></pre>
            <p class="mt-3 text-xs text-zinc-500">
              L'e-mail sert de "reçu" légal et permet à l'utilisateur d'être
              informé de la transaction même s'il n'est pas connecté au site.
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
