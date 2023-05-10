<script setup>
const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();
import { useSearchStore } from '~/store/searchStore';
const searchStore = useSearchStore();

watchEffect(() => {
  if (user.value) {
    navigateTo('/albums')
  }
})
</script>
<template>
  <h1>Homepage!</h1>
</template>