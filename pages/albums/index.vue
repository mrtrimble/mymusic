<script setup>
import { useSearchStore } from '~/store/searchStore';
const searchStore = useSearchStore();

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <header>
    <h1>Albums</h1>
  </header>
  <section>
    <Suspense>
      <AlbumList />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </section>
</template>

<style lang="scss" scoped>
header {
  padding-block: var(--space-m);
}
</style>