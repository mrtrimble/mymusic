<script setup>
const props = defineProps(['id', 'image'])
</script>

<template>
  <label :for="`result-${id}`"
         class="result-card">

    <figure role="group"
            v-if="image">
      <img :src="image" />
    </figure>
    <div class="place-holder"
         v-else>
    </div>
    <div class="result-content">
      <slot></slot>
      <input type="radio"
             name="result"
             :id="`result-${id}`" />
    </div>
  </label>
</template>

<style lang="scss" scoped>
.result-card {
  --image-max-width: 125px;
  background: var(--white);
  display: grid;
  grid-template-areas: 'image content';
  grid-template-columns: var(--image-max-width) 2fr;
  width: 100%;
  background: var(--white);
  box-shadow: var(--shadow);
  border-radius: var(--space-3xs);
  overflow: hidden;
  position: relative;

  &:has(input[type="radio"]:focus-visible) {
    outline: 3px solid var(--primary-color);
    outline-offset: 3px;

    input[type="radio"]:focus-visible {
      outline: none;
    }
  }

  &:has(input[type="radio"]:checked) {
    outline: 3px solid var(--accent-color);
    outline-offset: 3px;
  }

  figure {
    grid-area: image;
    width: 100%;
    aspect-ratio: 1;

    &:empty {
      display: none;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .place-holder {
    background: var(--light-color);
    width: 100%;
    aspect-ratio: 1;
  }

  .result-content {
    grid-area: content;
    display: grid;
    align-items: center;
    padding-inline: var(--space-s);
  }

  input[type="radio"] {
    appearance: none;
    position: absolute;
  }
}
</style>