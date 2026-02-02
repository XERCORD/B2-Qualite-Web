<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 69
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
              Cliquez sur les textes "Votre Email" ou "Mot de passe" : le champ
              correspondant s'active automatiquement.
            </div>

            <form class="max-w-sm mx-auto space-y-4">
              <!-- Champ 1 : Association explicite -->
              <div class="space-y-2">
                <label
                  for="email-demo"
                  class="block text-sm font-medium text-zinc-200 cursor-pointer"
                >
                  Votre Email <span class="text-zinc-500">(cliquez-moi)</span>
                </label>
                <input
                  id="email-demo"
                  type="email"
                  class="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="exemple@domaine.com"
                />
              </div>

              <!-- Champ 2 -->
              <div class="space-y-2">
                <label
                  for="password-demo"
                  class="block text-sm font-medium text-zinc-200 cursor-pointer"
                >
                  Mot de passe
                </label>
                <input
                  id="password-demo"
                  type="password"
                  class="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <!-- Checkbox -->
              <div class="flex items-center gap-3">
                <input
                  id="terms-demo"
                  type="checkbox"
                  class="h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  for="terms-demo"
                  class="text-sm text-zinc-300 cursor-pointer select-none"
                >
                  J'accepte les conditions
                </label>
              </div>

              <button
                type="button"
                class="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              >
                Connexion
              </button>
            </form>
          </div>

          <!-- CODE -->
          <div v-else>
            <pre
              class="rounded-xl bg-zinc-950 p-5 overflow-x-auto text-sm text-zinc-100"
            >
<code>
&lt;!-- Méthode recommandée : Association explicite (for + id) --&gt;
&lt;div class=&quot;space-y-2&quot;&gt;
  &lt;!-- L'attribut 'for' cible l'ID de l'input --&gt;
  &lt;label for=&quot;user-email&quot; class=&quot;block text-sm font-medium&quot;&gt;
    Votre Email
  &lt;/label&gt;
  
  &lt;input 
    id=&quot;user-email&quot; 
    type=&quot;email&quot; 
    name=&quot;email&quot;
    placeholder=&quot;exemple@mail.com&quot;
  /&gt;
&lt;/div&gt;

&lt;!-- Méthode alternative : Association implicite (wrapping) --&gt;
&lt;label class=&quot;flex items-center gap-2&quot;&gt;
  &lt;input type=&quot;checkbox&quot; name=&quot;newsletter&quot; /&gt;
  &lt;span&gt;S'abonner à la newsletter&lt;/span&gt;
&lt;/label&gt;
</code>
</pre>
            <p class="mt-3 text-xs text-zinc-500">
              L'attribut <code>for</code> du label doit correspondre exactement à
              l'attribut <code>id</code> de l'input. C'est ce lien qui permet
              aux technologies d'assistance de lire "Votre Email, champ de texte
              édition".
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