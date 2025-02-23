<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  id: string;
  type?: string;
  floating?: boolean;
  icon?: string;
  placeholder?: string;
  emphasis?: boolean;
  autocomplete?: string;
}>();

const model = defineModel<string>();
</script>

<template>
  <div :class="{ 'form-input-icon': icon , 'form-input-floating': floating }">
    <Icon v-if="icon" :icon="icon" class="input-icon h-5 w-5" />
    <input :id="id" v-model="model" :type="type || 'text'" class="from-input" :class="{ 'peer': floating, 'form-input-emphasis': emphasis }" :placeholder="!floating ? placeholder : ''" :autocomplete="autocomplete">
    <label v-if="floating" :for="id" :class="{ 'pl-8' : icon, 'form-label-emphasis': emphasis }">
      {{ placeholder }}
    </label>
  </div>
</template>
