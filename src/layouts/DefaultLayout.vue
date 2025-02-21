<script setup lang="ts">
import NavBar from "~/components/NavBar.vue";
</script>

<template>
  <div>
    <NavBar />
    <div class="container p-5">
      <slot />
    </div>
  </div>
</template>
