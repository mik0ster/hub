<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useNavigation } from './composables/useNavigation'
import TheHeader from './components/TheHeader.vue'
import TheMain from './components/TheMain.vue'
import TheFooter from './components/TheFooter.vue'

const { fetchConfig } = useNavigation()
const headerRef = ref(null)

const observer = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const height = entry.target.offsetHeight
    document.documentElement.style.setProperty('--header-height', `${height}px`)
  }
})

onMounted(() => {
  fetchConfig()

  if (headerRef.value) {
    observer.observe(headerRef.value)
  }
})

onUnmounted(() => {
  observer.disconnect()
})
</script>

<template>
  <div id="layout">
    <div ref="headerRef" class="layout__header">
      <TheHeader />
    </div>
    <TheMain />
    <TheFooter />
  </div>
</template>

<style scoped>
.layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
