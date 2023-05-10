<script setup>
import { useSearchStore } from '~/store/searchStore';
const searchStore = useSearchStore();

const artist = reactive({
  query: null
})

const runSearch = () => {
  if (!artist.query) return;
  searchStore.searchArtist(artist.query);
}
const selectArtist = (artist) => searchStore.selectArtist(artist);
</script>
<template>
  <header>
    <h1>Artist Search</h1>
  </header>
  <form @submit.prevent="runSearch"
        class="artist-search">
    <label for="artist-search">
      <span class="visually-hidden">
        Search For Artist
      </span>
      <input type="search"
             name="artist-search"
             v-model="artist.query"
             id="search"
             placeholder="Search">
    </label>
    <AppButton type="submit"
               :disabled="!artist.query">
      Find Artists
    </AppButton>
  </form>

  <Suspense>
    <ResultContainer :results="searchStore.artist.results"
                     title="Artists"
                     :action="selectArtist" />
    <template #fallback>
      Loading...
    </template>
  </Suspense>

  <ResultNextPage :open="searchStore.artist.selected"
                  :link="`/albums/add/album`">
    Choose Album
  </ResultNextPage>
</template>

<style lang="scss" scoped>
header {
  padding-block: var(--space-m);
}

.artist-search {
  --button-font-size: var(--step-2);

  display: flex;
  gap: var(--space-2xs);

  input[type="search"] {
    background: var(--white);
    font-family: var(--body-font-family);
    font-size: var(--step-2);
    border: 2px solid var(--primary-color);
    padding-block: var(--space-3xs);
    padding-inline: var(--space-xs);
    border-radius: var(--space-3xs);

    &:focus {
      outline: 3px solid var(--primary-color);
      outline-offset: 3px;
    }
  }
}

// .next-page{
//   background: var(--primary-color);
//   display: grid;
//   place-content: center;
//   padding: var(--space-s);
//   position:fixed;
//   left: 0;
//   bottom: 0;
//   width: 100%;
//   transform: translateY(100%);
//   transition: transform 0.2s ease;
//   &[open]{
//     transform: translateY(0);
//   }
//   a{
//     color: var(--white);
//   }
// }
</style>