<script setup>
import { useSearchStore } from '~/store/searchStore';

const searchStore = useSearchStore();
const selectAlbum = (album) => searchStore.selectAlbum(album);

if (!searchStore.artist.selected) navigateTo('/albums/add');
</script>

<template>
  <header>
    <h1>Select Album</h1>
  </header>
  <Suspense>
    <ResultContainer :results="searchStore.albums.results"
                     title="Albums"
                     :action="selectAlbum">

    </ResultContainer>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
    <ResultNextPage :open="searchStore.albums.selected"
                    :link="`/albums/add/summary`">
      Finish up
    </ResultNextPage>
</template>

<style lang="scss" scoped>
section{
  display: flex;
  justify-content: flex-end;
}
</style>