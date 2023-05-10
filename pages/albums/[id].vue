<script setup>
const route = useRoute()
</script>

<template>
  <header>
    <h1>Albums</h1>
  </header>
  <Suspense>
    <AlbumList :routeId="route.params.id" />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
  header{
    padding-block: var(--space-m);
  }
</style>