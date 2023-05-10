<script setup>
import { useSearchStore } from '~/store/searchStore';
const searchStore = useSearchStore();

if (!searchStore.artist.selected && !searchStore.albums.selected) navigateTo('/albums/add');

const client = useSupabaseClient();
const user = useSupabaseUser();

const newAlbum = reactive({
  media: null,
  rating: 0,
  favorite: null
})

let { data: options } = await useAsyncData('options', async () => {
  const { data } = await client
    .from('media_options')
    .select()
    .order('type')

  return data
})

const add = async () => {

  const payload = {
    ...newAlbum,
    name: searchStore.albums.selected.title,
    artist: searchStore.artist.selected.title,
    image: searchStore.albums.information.images[0].resource_url,
    user_id: user.value.id
  }

  try {
    await client
      .from('albums')
      .insert(payload)
  }
  catch (error) {
    console.error(error)
  }
  finally {
    navigateTo('/albums')
  }
}

</script>
<template>
  <header>
    <h1>Add Album</h1>
  </header>

  <section class="summary-card">
    <figure>
      <img :src="searchStore.albums.information.images[0].resource_url"
           :alt="`Cover of ${searchStore.albums.selected.title} by ${searchStore.artist.selected.title}`">
    </figure>
    <div class="summary-content flow">
      <div>
        <h2>{{ searchStore.albums.selected.title }}</h2>
        <p>{{ searchStore.artist.selected.title }}</p>
      </div>
      <form @submit.prevent="add"
            class="flow">
        <fieldset>
          <legend>Media</legend>
          <div class="media-options">
            <label :for="`album-media-${option.id}`"
                   v-for="option in options"
                   :key="option.id"
                   class="media-option">
              <template v-if="option.type == 'CD'">
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                        d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 32a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm-96-32a96 96 0 1 0 192 0 96 96 0 1 0 -192 0zM96 240c0-35 17.5-71.1 45.2-98.8S205 96 240 96c8.8 0 16-7.2 16-16s-7.2-16-16-16c-45.4 0-89.2 22.3-121.5 54.5S64 194.6 64 240c0 8.8 7.2 16 16 16s16-7.2 16-16z" />
                </svg>
              </template>
              <template v-if="option.type == 'Cassette'">
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                        d="M380.8 416c41.5-40.7 67.2-97.3 67.2-160C448 132.3 347.7 32 224 32S0 132.3 0 256S100.3 480 224 480H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H380.8zM224 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm64 96a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
                </svg>
              </template>
              <template v-if="option.type == 'Digital'">
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                        d="M64 464H320c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM192 272V400c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5L129.4 376H112c-8.8 0-16-7.2-16-16V312c0-8.8 7.2-16 16-16h17.4l35.3-35.3c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8zm85.8-4c11.6 20 18.2 43.3 18.2 68s-6.6 48-18.2 68c-6.6 11.5-21.3 15.4-32.8 8.8s-15.4-21.3-8.8-32.8c7.5-12.9 11.8-27.9 11.8-44s-4.3-31.1-11.8-44c-6.6-11.5-2.7-26.2 8.8-32.8s26.2-2.7 32.8 8.8z" />
                </svg>
              </template>
              <template v-if="option.type == 'Vinyl'">

                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                        d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 224a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                </svg>
              </template>
              {{ option.type }}
              <input type="radio"
                     v-model="newAlbum.media"
                     name="media"
                     :id="`album-media-${option.id}`"
                     :value="option.type" />
            </label>
          </div>
        </fieldset>
        <label for="album-rating"
               class="album-rating">
          Rating
          <span>
            <AlbumRating :rating="newAlbum.rating"
                         :animated="true" />
            <input type="range"
                   v-model="newAlbum.rating"
                   id="album-rating"
                   name="rating"
                   min="0"
                   max="5"
                   step="0.25" />
          </span>
          <!-- {{ newAlbum.rating }} -->
        </label>
        <label for="album-favorite"
               class="album-favorite"
               v-if="searchStore.albums.information && searchStore.albums.information.tracklist">
          Favorite Track
          <select v-model="newAlbum.favorite">
            <option v-for="track in searchStore.albums.information.tracklist"
                    :value="track.title">
              {{ track.title }}
            </option>
          </select>
        </label>
        <AppButton type="submit">
          Add to My Library
        </AppButton>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
header {
  padding-block: var(--space-m);
}

.summary-card {
  --image-max-width: 400px;

  display: grid;
  grid-template-columns: 1fr 2fr;
  width: fit-content;

  figure {
    width: var(--image-max-width);
    aspect-ratio: 1;
  }

  .summary-content {
    background: var(--white);
    padding: var(--space-s);
  }

  form {
    --button-font-size: var(--step-1);
    display: flex;
    flex-flow: column;

    input,
    select {
      background: var(--white);
      color: var(--dark-color);
    }

    fieldset {
      border: 0;

      .media-options {
        display: flex;
        gap: var(--space-2xs);
      }

      .media-option {
        padding-inline: var(--space-2xs);
        padding-block: var(--space-3xs);
        border: 1px solid var(--dark-color);
        border-radius: var(--space-3xs);
        display: flex;
        align-items: center;
        gap: var(--space-3xs);

        svg {
          height: var(--space-s);
          width: auto;
        }

        &:has(input[type="radio"]:focus-visible) {
          outline: 3px solid var(--primary-color);
          outline-offset: 3px;
        }

        &:has(input[type="radio"]:checked) {
          background: var(--accent-color);
        }

        input[type="radio"] {
          appearance: none;
          outline: none;
          position: absolute;
        }
      }
    }

    label:not(.media-option),
    legend {
      font-family: var(--header-font-family);
      color: var(--primary-color);
    }

    .album-rating {
      span {
        display: grid;
        grid-template-areas: 'stack';
        width: fit-content;

        >* {
          grid-area: stack;
        }

        input[type="range"] {
          opacity: 0;
        }

        &:has(input[type="range"]:focus-visible) {
          outline: 3px solid var(--primary-color);
          outline-offset: 3px;
        }
      }
    }

    .album-favorite {
      display: flex;
      flex-flow: column;
      width: min(100%, 50ch);

      select {
        width: 100%;
        font-size: var(--step-1);
        padding: var(--space-2xs);
        border: 1px solid var(--dark-color);
        font-family: var(--body-font-family);

        &:focus-visible {
          outline: 3px solid var(--primary-color);
          outline-offset: 3px;
        }
      }
    }
  }
}</style>