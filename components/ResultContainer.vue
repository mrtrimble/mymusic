<script setup>
const props = defineProps(['results', 'title', 'action'])
</script>

<template>
  <fieldset v-if="results">
    <legend>{{ title }}</legend>
    <ResultCard v-for="result in results"
                :key="result.id"
                :id="result.id"
                :image="result.thumb"
                @click="action(result)">
      {{ result.title }}
    </ResultCard>
  </fieldset>
  <slot></slot>
</template>

<style lang="scss" scoped>
fieldset{
  border: none;
  margin-block-start: var(--space-m);
  --min: 25ch;
  --gap: var(--space-s);

  container-type: inline-size;
  display: grid;
  grid-gap: var(--gap);

  padding: 0;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  // grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));

  legend {
    font-family: var(--header-font-family);
    font-size: var(--step-2);
    color: var(--primary-color);
  }
}
</style>