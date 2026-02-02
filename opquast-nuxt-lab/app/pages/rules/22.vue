<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 22
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
              Exemple de système d'authentification unifiée avec un identifiant unique
            </div>

            <div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-zinc-100 mb-1">
                  Système d'Authentification Unifiée
                </h3>
                <p class="text-sm text-zinc-400">
                  Un identifiant unique pour tous vos services
                </p>
              </div>

              <div class="max-w-md mx-auto bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <div class="mb-4">
                  <div class="flex border-b border-zinc-800">
                    <button class="flex-1 py-2 font-semibold text-zinc-100 border-b-2 border-zinc-100">
                      Connexion
                    </button>
                    <button class="flex-1 py-2 font-semibold text-zinc-400">
                      Inscription
                    </button>
                  </div>
                </div>

                <form class="space-y-3">
                  <div>
                    <label class="block text-xs font-medium text-zinc-200 mb-1">
                      Identifiant unique
                    </label>
                    <input
                      type="text"
                      class="w-full px-3 py-2 border border-zinc-700 bg-zinc-800 rounded text-sm text-zinc-100"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-zinc-200 mb-1">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      class="w-full px-3 py-2 border border-zinc-700 bg-zinc-800 rounded text-sm text-zinc-100"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    class="w-full bg-zinc-700 text-zinc-100 py-2 rounded font-semibold hover:bg-zinc-600 transition-colors"
                  >
                    Se connecter
                  </button>
                </form>

                <div class="mt-4 p-3 bg-zinc-800 border border-zinc-700 rounded">
                  <p class="text-xs text-zinc-200 font-medium mb-1">
                    Vos données sont protégées
                  </p>
                  <p class="text-xs text-zinc-400">
                    Vos identifiants sont utilisés de manière sécurisée et partagés uniquement entre nos services autorisés.
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
&lt;!-- Formulaire de connexion unifié --&gt;
&lt;div class=&quot;max-w-md mx-auto bg-zinc-900 rounded-lg p-6 border border-zinc-800&quot;&gt;
  &lt;form class=&quot;space-y-4&quot;&gt;
    &lt;div&gt;
      &lt;label class=&quot;block text-sm font-medium text-zinc-200 mb-1&quot;&gt;
        Identifiant unique
      &lt;/label&gt;
      &lt;input
        type=&quot;text&quot;
        placeholder=&quot;votre.email@exemple.com&quot;
        class=&quot;w-full px-4 py-2 border border-zinc-700 bg-zinc-800 rounded-lg text-zinc-100&quot;
      /&gt;
    &lt;/div&gt;

    &lt;div&gt;
      &lt;label class=&quot;block text-sm font-medium text-zinc-200 mb-1&quot;&gt;
        Mot de passe
      &lt;/label&gt;
      &lt;input
        type=&quot;password&quot;
        placeholder=&quot;••••••••&quot;
        class=&quot;w-full px-4 py-2 border border-zinc-700 bg-zinc-800 rounded-lg text-zinc-100&quot;
      /&gt;
    &lt;/div&gt;

    &lt;button
      type=&quot;submit&quot;
      class=&quot;w-full bg-zinc-700 text-zinc-100 py-3 rounded-lg font-semibold&quot;
    &gt;
      Se connecter
    &lt;/button&gt;
  &lt;/form&gt;

  &lt;div class=&quot;mt-4 p-3 bg-zinc-800 border border-zinc-700 rounded&quot;&gt;
    &lt;p class=&quot;text-xs text-zinc-200 font-medium&quot;&gt;Vos données sont protégées&lt;/p&gt;
    &lt;p class=&quot;text-xs text-zinc-400&quot;&gt;
      Vos identifiants sont utilisés de manière sécurisée.
    &lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code>
</pre>

            <p class="mt-3 text-xs text-zinc-500">
              Un système d'authentification unifiée permet aux utilisateurs d'utiliser un seul identifiant pour accéder à tous les services, améliorant ainsi la sécurité et l'expérience utilisateur.
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