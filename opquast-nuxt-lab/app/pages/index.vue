<script setup>
import rules from '~/data/rules.json'
</script>

<template>
  <section class="space-y-8">
    <div class="space-y-2">
      <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight">
        Explorer les règles, par l’exemple
      </h1>

      <p class="text-zinc-300 max-w-4xl">
        Chaque règle du référentiel Opquast est ici traduite en situations
        concrètes : objectifs, mise en œuvre, contrôles, exemples visuels et
        pistes techniques.
        <br /><br />
        Ce laboratoire a pour but de montrer
        <strong>comment appliquer les règles</strong>, en plus de les connaître.
      </p>
    </div>

    <div class="grid gap-3">
      <NuxtLink
        v-for="r in rules"
        :key="r.id"
        :to="r.path"
        class="group rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 hover:bg-zinc-900 transition"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-start gap-4 min-w-0">
            <!-- Gros numéro -->
            <div
              class="shrink-0 w-12 text-3xl sm:text-4xl font-semibold leading-none tracking-tight text-zinc-600 group-hover:text-zinc-400 transition"
            >
              {{ r.id }}
            </div>

            <!-- Texte -->
            <div class="min-w-0">
              <div class="text-sm text-zinc-400 truncate">
                Règle n° {{ r.id }}
                <span v-if="r.authors && r.authors.length">
                  | {{ r.authors.join(', ') }}
                </span>
              </div>

              <div
                class="text-base font-medium text-zinc-100 group-hover:text-white transition"
              >
                {{ r.title }}
              </div>
            </div>
          </div>

          <span class="text-zinc-500 group-hover:text-zinc-300 transition"
            >→</span
          >
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
