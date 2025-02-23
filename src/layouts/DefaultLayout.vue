<script setup lang="ts">
import FooterSection from "~/components/FooterSection.vue";
import NavBar from "~/components/NavBar.vue";
</script>

<template>
  <NavBar />
  <slot />
  <FooterSection />
</template>
