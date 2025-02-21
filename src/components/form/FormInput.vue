<script setup lang="ts">
defineProps<{
  modelValue: string;
  label: string;
  id: string;
  floating?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="w-full" :class="{ 'relative': floating }">
    <input
      type="text"
      :id="id"
      :value="modelValue"
      @input="updateValue"
      class="w-full rounded-lg border border-gray-300 bg-transparent text-sm text-body placeholder-transparent focus:border-blue-300 focus:outline-none dark:border-gray-600"
      :class="floating ? 'peer px-4 pt-4 pb-1.5 h-14' : 'p-2.5'"
      placeholder=""
    />
    <label
      v-if="floating"
      :for="id"
      class="absolute start-4 top-1.5 text-xs text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300"
    >
      {{ label }}
    </label>
  </div>
</template>
