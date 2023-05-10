<script setup>
const props = defineProps(['fullBleed'])
</script>

<template>
  <div class="container"
       :class="{ 'full-bleed': props.fullBleed }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: min(100% - 3rem, var(--container-max, 120ch));
  margin-inline: auto;

  &.full-bleed {
    width: 100%;
  }
}
</style>