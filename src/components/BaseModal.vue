<template>
  <div v-if="modelValue" class="fixed top-0 left-0 bg-gray-300 w-full h-screen">
    <div class="h-4/5 p-6">
      <slot />
    </div>
    <hr />
    <button
      class="absolute bottom-4 p-4"
      @click="$emit('update:modelValue', false)"
    >
      close
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: Boolean,
});
</script>
