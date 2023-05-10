<template>
  <button>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  background: var(--primary-color);
  border: none;
  border-radius: var(--space-3xs);
  color: var(--white);
  padding-block: var(--space-3xs);
  padding-inline: var(--space-2xs);
  font-size: var(--button-font-size, inherit);
  transition: background 0.2s ease;
  width: fit-content;

  &:hover {
    background: var(--primary-dark-color);
  }

  &:focus-visible {
    outline: 3px solid var(--primary-color);
    outline-offset: 3px;
  }
}
</style>