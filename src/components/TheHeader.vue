<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'

import AppLogo from './AppLogo.vue'

const route = useRoute()
const { currentLang, toggleLanguage } = useLanguage()
const { findTitleByPath, navigationData, isLoading } = useNavigation()

const langLabel = computed(() => {
  return currentLang.value.toUpperCase()
})

const pageTitle = computed(() => {
  if (route.name === '404') return '404'

  if (route.name === 'home') return currentLang.value === 'ru' ? 'Главная' : 'Home'

  if (isLoading.value) return '...'

  if (route.params.pathMatch && !isLoading.value) {
    const currentPath = route.params.pathMatch.join('/')
    const titleFromConfig = findTitleByPath(navigationData.value, currentPath)
    return titleFromConfig || currentPath
  }

  return '-|\'-\'|-'
})
</script>

<template>
  <header class="header">
    <div class="header__inner header__left">
      <router-link class="header__logo-link" to="/">
        <AppLogo />
      </router-link>
    </div>
    <div class="header__inner header__center">
      <p class="header__current-route">{{ pageTitle }}</p>
    </div>
    <div class="header__inner header__right">
      <button class="header__lang-switcher" @click="toggleLanguage">{{ langLabel }}</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 1.5rem;
  padding: 1rem 1.5rem;
  transition: top var(--transition);
  backdrop-filter: var(--filter-background-blur);
}

.header__inner {
  display: flex;
  align-items: center;
}

.header__left {
  justify-content: flex-start;
}

.header__logo-link {
  display: inline-block;
}

.header__current-route {
  font-weight: 600;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.header__right {
  justify-content: flex-end;
}

.header__lang-switcher {
  background: var(--color-surface);
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 0.3rem 0.6rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-text);
  transition: opacity var(--transition);
}

.header__lang-switcher:hover {
  opacity: 0.8;
}
</style>
