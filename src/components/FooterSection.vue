<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { SITE } from "~/utils/site";
</script>

<template>
  <footer class="bg-body-secondary">
    <div class="container mx-auto py-10 grid lg:grid-cols-12">
      <div class="col-span-12 lg:col-span-8">
        <p class="text-2xl font-bold">{{ SITE.name }}</p>
        <p class="text-body-secondary">© {{ new Date().getFullYear() }}, {{ SITE.author }}.</p>
      </div>
      <div class="col-span-12 lg:col-span-4 flex flex-col items-end my-auto">
        <a class="flex items-center gap-1 hover:underline" :href="SITE.repository" target="_blank" rel="noopener noreferrer">
          <Icon icon="simple-icons:github" />
          <span>GitHub repository</span>
        </a>
      </div>
    </div>
  </footer>
</template>
