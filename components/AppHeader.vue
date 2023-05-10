<script setup>
const client = useSupabaseAuthClient();
const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();

const logout = async () => {
  await client.auth.signOut();
  navigateTo('/');
}
</script>

<template>
  <header class="header"
          role="banner">
    <AppContainer>
      <section class="header-logo">
        <NuxtLink to="/">
          <AppLogo />
        </NuxtLink>
      </section>

      <section class="header-actions">
        <nav v-if="user"
             aria-label="main">
          <NuxtLink :to="`/albums/${user.id}`">My Library</NuxtLink>
          <NuxtLink to="/albums/add">Add Album</NuxtLink>
        </nav>
        <AppButton v-if="user"
                   @click="logout">
          Logout
        </AppButton>
        <template v-else>
          <AppButton @click="auth.signInWithOAuth({ provider: 'google' })">
            Sign in with Google
          </AppButton>
          <AppButton @click="auth.signInWithOAuth({ provider: 'github' })">
            Sign in with Github
          </AppButton>
        </template>
      </section>
    </AppContainer>
  </header>
</template>

<style lang="scss" scoped>
.header[role='banner'] {
  container-type: inline-size;
  display: flex;
  padding-block: var(--space-xl);

  .container {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-s);

    @container (min-width: 700px) {
      flex-flow: row;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-s);

    nav {
      display: flex;
      gap: var(--space-s);

      a {
        &:focus {
          outline: 3px solid var(--primary-color);
          outline-offset: 3px;
        }
      }
    }
  }
}
</style>