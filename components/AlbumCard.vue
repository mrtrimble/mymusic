<script setup>
const props = defineProps(['album'])
const user = useSupabaseUser()
const client = useSupabaseClient()
import { useAlbumStore } from '~/store/albumStore';

const albumStore = useAlbumStore()

const remove = async () => {
  try {
    await client.from('albums').delete().eq('id', props.album.id)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    albumStore.removeAlbum(props.album)
  }
}

const canDelete = computed(() => props.album.user_id == user.value?.id)
</script>

<template>
  <li class="album-card">
    <figure role="group">
      <img :src="album.image"
           :alt="`Cover of ${album.name} by ${album.artist}`" />
      <figcaption>
        <template v-if="album.media == 'CD'">

          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <title>CD</title>
            <path
                  d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 32a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm-96-32a96 96 0 1 0 192 0 96 96 0 1 0 -192 0zM96 240c0-35 17.5-71.1 45.2-98.8S205 96 240 96c8.8 0 16-7.2 16-16s-7.2-16-16-16c-45.4 0-89.2 22.3-121.5 54.5S64 194.6 64 240c0 8.8 7.2 16 16 16s16-7.2 16-16z" />
          </svg>
        </template>
        <template v-if="album.media == 'Cassette'">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <title>Cassette</title>
            <path
                  d="M380.8 416c41.5-40.7 67.2-97.3 67.2-160C448 132.3 347.7 32 224 32S0 132.3 0 256S100.3 480 224 480H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H380.8zM224 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm64 96a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
          </svg>
        </template>
        <template v-if="album.media == 'Digital'">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <title>Digital</title>
            <path
                  d="M64 464H320c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM192 272V400c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5L129.4 376H112c-8.8 0-16-7.2-16-16V312c0-8.8 7.2-16 16-16h17.4l35.3-35.3c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8zm85.8-4c11.6 20 18.2 43.3 18.2 68s-6.6 48-18.2 68c-6.6 11.5-21.3 15.4-32.8 8.8s-15.4-21.3-8.8-32.8c7.5-12.9 11.8-27.9 11.8-44s-4.3-31.1-11.8-44c-6.6-11.5-2.7-26.2 8.8-32.8s26.2-2.7 32.8 8.8z" />
          </svg>
        </template>
        <template v-if="album.media == 'Vinyl'">

          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <title>Vinyl</title>
            <path
                  d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 224a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
          </svg>
        </template>
      </figcaption>
    </figure>
    <div class="album-content">
      <h2 class="step-1">{{ album.name }}</h2>
      <p>{{ album.artist }}</p>
      <dl>
        <div>
          <dt>Favorite Track</dt>
          <dd>{{ album.favorite }}</dd>
        </div>
        <div>
          <dt>Rating</dt>
          <dd>
            <AlbumRating :rating="album.rating"
                         :id="album.id" />
          </dd>
        </div>
      </dl>
      <div class="album-actions">
        <AppButton v-if="canDelete"
                   @click="remove">
          Delete
        </AppButton>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.album-card {
  --image-max-width: 250px;

  display: grid;
  grid-template-areas:
    'image'
    'content';
  width: 100%;
  background: var(--white);
  box-shadow: var(--shadow);
  border-radius: var(--space-3xs);
  overflow: hidden;

  figure {
    grid-area: image;
    width: 100%;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .album-content {
    grid-area: content;

    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 100%;
    padding-block: var(--space-xs);

    >* {
      margin: 0;
      padding: 0;
      padding-inline: var(--space-s);
    }

    dl {
      display: flex;
      gap: var(--space-s);
      margin: 0;
      margin-block-start: var(--space-2xs);

      dt {
        font-family: Josefin Sans;
        font-weight: bold;
      }
    }

  }

  .album-actions {
    margin-block-start: var(--space-2xs);
  }

  @container (min-width: 700px) {
    grid-template-areas: 'image content';
    grid-template-columns: var(--image-max-width) 2fr;

    figure {
      width: var(--image-max-width);
      aspect-ratio: 1;
      position: relative;

      figcaption {
        position: absolute;
        bottom: 0;
        background: var(--primary-color);
        width: 100%;
        display: grid;
        place-content: center;
        padding-block: var(--space-3xs);
        transform: translateY(100%);
        transition: transform 0.2s ease;

        svg {
          height: var(--space-m);
          fill: var(--white);
        }
      }
    }

    &:hover {
      figcaption {
        transform: translateY(0);
      }
    }
  }

}
</style>