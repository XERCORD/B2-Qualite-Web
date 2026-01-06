<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 p-4">
    <header class="border-b border-zinc-800">
      <div
        class="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between"
      >
        <div class="flex flex-col gap-2">
          <NuxtLink
            to="/"
            class="font-semibold text-xl tracking-tight hover:opacity-80"
          >
            Opquast Lab | 250 Règles Appliquées
          </NuxtLink>
          <NuxtLink
            to="https://checklists.opquast.com/fr/qualite-numerique/"
            target="_blank"
            class="text-xs tracking-tight hover:opacity-80"
          >
            Basé sur le
            <span class="underline underline-offset-4"
              >Référentiel Opquast - Qualité Numérique</span
            >
          </NuxtLink>
        </div>

        <nav class="text-sm text-zinc-300 flex items-center gap-4">
          <NuxtLink to="/aide" class="hover:opacity-80">Aide</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <NuxtPage />
    </main>

    <footer class="border-t border-zinc-800">
      <div class="mx-auto max-w-5xl px-6 py-6 text-xs text-zinc-500">
        Démo Pédagogique
      </div>
    </footer>
  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'Opquast Lab — RSS',
      href: '/rss.xml',
    },
  ],
})
</script>
