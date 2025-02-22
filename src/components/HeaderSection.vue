<script setup lang="ts">
import { useMotionBinds } from "~/utils/motion";

defineProps<{
  title: string;
  description: string;
}>();

const { fadeInScaleDim, fadeInSlideUp, fadeInSlideUpDim } = useMotionBinds();
</script>

<template>
  <section class="relative overflow-hidden bg-primary">
    <!-- Decorative shapes -->
    <div class="absolute inset-0 overflow-hidden opacity-30">
      <div v-motion class="absolute -left-1/4 -top-1/2 w-1/2 h-3/4 rounded-full bg-body" v-bind="fadeInScaleDim" :delay="200" />
      <div v-motion class="absolute -right-1/4 -bottom-1/2 w-1/2 h-3/4 rounded-full bg-body" v-bind="fadeInScaleDim" :delay="300" />
    </div>
    <!-- Title and description -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div class="text-center space-y-8">
        <div class="space-y-4">
          <h1 v-motion class="text-4xl sm:text-6xl font-bold" v-bind="fadeInSlideUp">
            <span v-motion class="block" v-bind="fadeInSlideUpDim" :delay="150">
              {{ title }}
            </span>
          </h1>
          <p v-motion class="max-w-2xl mx-auto text-xl" v-bind="fadeInSlideUpDim" :delay="300">
            {{ description }}
          </p>
        </div>
        <slot />
      </div>
    </div>
  </section>
</template>
