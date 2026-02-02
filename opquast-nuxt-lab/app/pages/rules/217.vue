<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 217
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

      <ul
        v-if="Array.isArray(rule.objectives)"
        class="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-300"
      >
        <li v-for="o in rule.objectives" :key="o">{{ o }}</li>
      </ul>

      <p v-else class="mt-1 text-sm text-zinc-300">
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
              Exemple de configuration DNS pour authentifier un domaine de
              messagerie
            </div>

            <div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <h3 class="text-lg font-semibold text-zinc-100 mb-4">
                Extraits d&apos;enregistrements DNS SPF, DKIM et DMARC
              </h3>

              <div class="space-y-4 text-sm text-zinc-300">
                <div>
                  <p class="font-medium text-zinc-200">SPF</p>
                  <p class="text-xs text-zinc-400 mb-1">
                    Autorise uniquement les serveurs listés à envoyer des mails
                    pour le domaine <code>exemple.com</code>.
                  </p>
                  <div
                    class="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-100 overflow-x-auto"
                  >
                    exemple.com. TXT "v=spf1 mx include:mail.exemple.com -all"
                  </div>
                </div>

                <div>
                  <p class="font-medium text-zinc-200">DKIM</p>
                  <p class="text-xs text-zinc-400 mb-1">
                    Clé publique utilisée pour vérifier la signature des
                    e-mails sortants.
                  </p>
                  <div
                    class="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-100 overflow-x-auto"
                  >
                    mail._domainkey.exemple.com. TXT
                    "v=DKIM1; k=rsa; p=MIIBIjANBgkq...hash-exemple..."
                  </div>
                </div>

                <div>
                  <p class="font-medium text-zinc-200">DMARC</p>
                  <p class="text-xs text-zinc-400 mb-1">
                    Politique de traitement des mails qui échouent SPF/DKIM.
                  </p>
                  <div
                    class="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-100 overflow-x-auto"
                  >
                    _dmarc.exemple.com. TXT
                    "v=DMARC1; p=quarantine; rua=mailto:dmarc@exemple.com"
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
; SPF
exemple.com.          TXT "v=spf1 mx include:mail.exemple.com -all"

; DKIM
mail._domainkey.exemple.com. TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkq...hash-exemple..."

; DMARC
_dmarc.exemple.com.  TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@exemple.com"
</code>
</pre>

            <p class="mt-3 text-xs text-zinc-500">
              Lors de l&apos;audit, on vérifie l&apos;existence et la bonne
              configuration de ces enregistrements dans la zone DNS du
              domaine.
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
