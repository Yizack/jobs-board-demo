<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";
import { SITE } from "~/utils/site";

const isOpen = ref(false);
const mode = useColorMode();

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const pages = [
  { name: "About", path: "#about" },
  { name: "Work Experience", path: "#work" },
  { name: "Projects", path: "#projects" }
];
</script>

<template>
  <div class="bg-body-secondary px-6 py-4 sticky top-0 w-full z-50 shadow-md">
    <div class="flex justify-between items-center w-full max-w-6xl mx-auto gap-4">
      <h1 class="text-xl font-semibold">{{ SITE.name }}</h1>
      <nav class="hidden lg:flex gap-4 items-center ms-auto">
        <RouterLink v-for="(page, i) of SITE.pages" :key="i" :to="page.path" class="rounded-md px-3 py-2 font-medium hover:bg-slate-700 hover:text-white">
          {{ page.name }}
        </RouterLink>
      </nav>
      <div class="flex lg:border-s gap-4">
        <button class="ms-5 rounded-md px-3 py-2 hover:bg-slate-700 hover:text-white cursor-pointer" role="button" title="Toogle Theme" @click="mode = mode === 'dark' ? 'light' : 'dark'">
          <Icon :icon="mode === 'dark' ? 'tabler:moon' : 'tabler:sun'" class="w-6 h-6" />
        </button>
        <Transition name="slide-right" mode="out-in">
          <button v-if="!isOpen" class="lg:hidden rounded-md px-3 py-2 hover:bg-slate-700 hover:text-white" @click="toggleMenu">
            <Icon icon="tabler:menu-2" size="1.5rem" />
          </button>
        </Transition>
      </div>
    </div>
  </div>
  <div v-if="isOpen" class="fixed inset-0 bg-slate-900 opacity-50 z-40 lg:hidden" @click="toggleMenu" />
  <Transition name="slide-left" mode="out-in">
    <div v-if="isOpen" class="w-80 bg-slate-50 dark:bg-slate-900 shadow-xl fixed inset-y-0 left-0 z-50 transform transition-transform lg:hidden" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <div class="flex items-center justify-between border-b dark:border-slate-700 p-4">
        <h2 class="text-lg font-semibold"></h2>
        <button class="focus:outline-none hover:bg-red-400 hover:text-slate-900 rounded-md p-1" @click="toggleMenu">
          <Icon icon="tabler:x" class="w-6 h-6" />
        </button>
      </div>
      <nav class="flex flex-col space-y-2 p-4">
        <RouterLink v-for="(page, i) of pages" :key="i" :to="page.path" class="rounded-md px-3 py-3 text-sm font-medium hover:bg-slate-700 hover:text-white" @click="toggleMenu">{{ page.name }}</RouterLink>
      </nav>
    </div>
  </Transition>
</template>
