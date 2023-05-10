<script setup>
import { useSearchStore } from '~/store/searchStore';
const searchStore = useSearchStore();

onBeforeUnmount(() => searchStore.resetAllSearch());
</script>

<template>
  <NuxtPage />
</template>

<!-- <style>
form {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

input[type="submit"] {
  width: fit-content;
}
</style> -->