<script setup>
const version = __APP_VERSION__
</script>

<template>
  <footer class="footer">
    <p class="footer__copyright">&copy; Just the most banal footer in 2026</p>
    <p class="footer__version">v{{ version }}</p>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  background-color: #161616;
}
</style>
