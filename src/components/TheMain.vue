<script setup>
import TheSidebar from './TheSidebar.vue'
</script>

<template>
  <main class="main">
    <div class="main__page">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - var(--header-height));
}

.main__page {
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5em;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
