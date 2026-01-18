<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'
import MarkdownIt from 'markdown-it'

const route = useRoute()
const router = useRouter()
const { currentLang } = useLanguage()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const content = ref('')
const isLoading = ref(true)
const hasError = ref(false)

const loadMarkdownContent = async () => {
  if (!route.params.pathMatch) return

  isLoading.value = true
  hasError.value = false
  
  const path = route.params.pathMatch.join('/')
  const fileName = `${path}.md` 
  const url = `https://raw.githubusercontent.com/mik0ster/hub-db/main/pages/${currentLang.value}/${path}/${fileName}`

  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Page not found')
    }

    const rawText = await response.text()
    content.value = md.render(rawText) // MD to HTML
  } catch (err) {
    console.error(err)
    hasError.value = true

    router.push({ name: '404' })
  } finally {
    isLoading.value = false
  }
}

watch(currentLang, () => {
  loadMarkdownContent()
})

watch(() => route.path, () => {
  loadMarkdownContent()
})

onMounted(() => {
  loadMarkdownContent()
})
</script>

<template>
  <div v-html="content" class="page markdown-body"></div>
</template>

<style scoped>
.page {
  color: var(--color-text);
}
</style>
