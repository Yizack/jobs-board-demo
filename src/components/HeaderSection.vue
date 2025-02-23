<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  lg?: boolean;
}>();
</script>

<template>
  <header class="relative overflow-hidden bg-primary">
    <!-- Decorative shapes -->
    <div class="absolute inset-0 overflow-hidden opacity-30">
      <div v-motion-fade-scale-dim class="absolute -left-1/4 -top-1/2 w-1/2 h-3/4 rounded-full bg-body" :delay="400" />
      <div v-motion-fade-scale-dim class="absolute -right-1/4 -bottom-1/2 w-1/2 h-3/4 rounded-full bg-body" :delay="500" />
    </div>
    <!-- Title and description -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" :class="lg ? 'py-24 sm:py-32' : 'py-8 sm:py-12'">
      <div class="text-center space-y-8">
        <div class="space-y-4">
          <h1 v-motion-fade-slide-bottom class="text-4xl sm:text-6xl font-bold">
            <span v-motion-slide-bottom-dim class="block" :delay="150">
              {{ title }}
            </span>
          </h1>
          <p v-motion-fade-slide-bottom-dim class="max-w-2xl mx-auto text-xl" :delay="200">
            {{ description }}
          </p>
        </div>
        <slot />
      </div>
    </div>
  </header>
</template>
