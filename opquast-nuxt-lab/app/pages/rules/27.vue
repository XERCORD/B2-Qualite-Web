<script setup>
import { getRuleById } from '~/data/rules'

const ruleId = 27
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
              Comparaison entre HTTP et HTTPS pour la sécurité des données
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- HTTP - Insécurisé -->
              <div class="rounded-xl border border-red-900 bg-zinc-950 p-5">
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-red-400 text-xl">⚠</span>
                  <h4 class="font-semibold text-red-300">HTTP - Non sécurisé</h4>
                </div>

                <div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800 mb-3">
                  <div class="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-800">
                    <div class="flex items-center gap-2 flex-1 bg-zinc-800 rounded px-3 py-1.5">
                      <span class="text-red-400">🔓</span>
                      <span class="text-xs text-zinc-400">http://exemple.com</span>
                    </div>
                  </div>
                  
                  <div class="space-y-2 text-xs">
                    <div class="flex items-start gap-2">
                      <span class="text-red-400">✗</span>
                      <span class="text-zinc-400">Données transmises en clair</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-red-400">✗</span>
                      <span class="text-zinc-400">Vulnérable aux interceptions</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-red-400">✗</span>
                      <span class="text-zinc-400">Pas de vérification d'identité</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-red-400">✗</span>
                      <span class="text-zinc-400">Avertissement navigateur</span>
                    </div>
                  </div>
                </div>

                <div class="bg-red-900/20 border border-red-900 rounded p-3">
                  <p class="text-xs text-red-300">
                    ⚠ Les navigateurs affichent des avertissements de sécurité
                  </p>
                </div>
              </div>

              <!-- HTTPS - Sécurisé -->
              <div class="rounded-xl border border-green-900 bg-zinc-950 p-5">
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-green-400 text-xl">✓</span>
                  <h4 class="font-semibold text-green-300">HTTPS - Sécurisé</h4>
                </div>

                <div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800 mb-3">
                  <div class="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-800">
                    <div class="flex items-center gap-2 flex-1 bg-zinc-800 rounded px-3 py-1.5">
                      <span class="text-green-400">🔒</span>
                      <span class="text-xs text-zinc-100">https://exemple.com</span>
                    </div>
                  </div>
                  
                  <div class="space-y-2 text-xs">
                    <div class="flex items-start gap-2">
                      <span class="text-green-400">✓</span>
                      <span class="text-zinc-300">Chiffrement des données</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-green-400">✓</span>
                      <span class="text-zinc-300">Protection contre l'interception</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-green-400">✓</span>
                      <span class="text-zinc-300">Vérification de l'identité</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-green-400">✓</span>
                      <span class="text-zinc-300">Confiance des utilisateurs</span>
                    </div>
                  </div>
                </div>

                <div class="bg-green-900/20 border border-green-900 rounded p-3">
                  <p class="text-xs text-green-300">
                    ✓ Certificat SSL/TLS valide
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
&lt;!-- Configuration de redirection HTTP vers HTTPS --&gt;

&lt;!-- Dans Nginx --&gt;
server {
    listen 80;
    server_name exemple.com www.exemple.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name exemple.com www.exemple.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Configurations SSL recommandées
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # HSTS (optionnel mais recommandé)
    add_header Strict-Transport-Security &quot;max-age=31536000; includeSubDomains&quot; always;
}

&lt;!-- Dans Apache --&gt;
&lt;VirtualHost *:80&gt;
    ServerName exemple.com
    Redirect permanent / https://exemple.com/
&lt;/VirtualHost&gt;

&lt;VirtualHost *:443&gt;
    ServerName exemple.com
    
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem
    
    # Protocoles et chiffrements recommandés
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite HIGH:!aNULL:!MD5
    
    # HSTS
    Header always set Strict-Transport-Security &quot;max-age=31536000; includeSubDomains&quot;
&lt;/VirtualHost&gt;

&lt;!-- Obtenir un certificat SSL gratuit avec Let's Encrypt --&gt;
# Installation de Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir et installer automatiquement le certificat
sudo certbot --nginx -d exemple.com -d www.exemple.com

# Renouvellement automatique
sudo certbot renew --dry-run

&lt;!-- Forcer HTTPS en HTML --&gt;
&lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;upgrade-insecure-requests&quot;&gt;
</code>
</pre>

            <p class="mt-3 text-xs text-zinc-500">
              HTTPS utilise SSL/TLS pour chiffrer toutes les communications entre le navigateur et le serveur, protégeant les données sensibles contre l'interception et garantissant l'authenticité du site web.
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