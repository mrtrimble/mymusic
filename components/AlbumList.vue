<script setup>
const props = defineProps(['routeId'])
const user = useSupabaseUser();
const client = useSupabaseClient()
import { useAlbumStore } from '~/store/albumStore';

const albumStore = useAlbumStore();

let { data: albums } = await useAsyncData('albums', async () => {
  const { data } = await client
    .from('albums')
    .select()
    .eq('user_id', props.routeId ? props.routeId : user.value.id)
    .order('created_at', { ascending: false })

  albumStore.setAlbums(data)
})
</script>

<template>
  <ul class="album-list"
      role="list">
    <AlbumCard v-for="album in albumStore.albums"
               :album="album"
               :key="album.id"
               :id="album.id" />
  </ul>
</template>

<style lang="scss" scoped>
.album-list {
  --min: 40ch;
  --gap: var(--space-s);

  container-type: inline-size;
  display: grid;
  grid-gap: var(--gap);

  padding: 0;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  list-style: none;
}
</style>

