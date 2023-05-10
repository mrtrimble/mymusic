<script setup>
const props = defineProps(['link', 'open'])
</script>
<template>
  <dialog class="next-page"
          :open="open">
    <NuxtLink :to="link">
      <slot></slot>
    </NuxtLink>
  </dialog>
</template>


<style lang="scss" scoped>
.next-page {
  background: var(--primary-color);
  display: grid;
  place-content: center;
  padding: var(--space-s);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  transform: translateY(100%);
  transition: transform 0.2s ease, background 0.2s ease;

  &:has(a:hover) {
    background: var(--primary-dark-color);
  }

  &[open] {
    transform: translateY(0);
  }

  a {
    color: var(--white);

    &:before {
      content: '';
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
    }

    &:focus-visible {
      outline: 3px solid var(--white);
      outline-offset: 3px;
    }
  }
}</style>