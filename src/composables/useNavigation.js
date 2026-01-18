import { ref } from 'vue'
import { useLanguage } from './useLanguage'

const navigationData = ref([])
const isLoading = ref(true)

export function useNavigation() {
  const { currentLang } = useLanguage()

  const fetchConfig = async () => {
    isLoading.value = true
    try {
      const url = `https://raw.githubusercontent.com/mik0ster/hub-db/main/pages/config.json`
      const response = await fetch(url)
        
      if (!response.ok) throw new Error('Network error or file not found')
        
      navigationData.value = await response.json()
    } catch (e) {
      console.error("Error loading config:", e)
    } finally {
      isLoading.value = false
    }
  }

  const findTitleByPath = (items, path) => {
    for (const item of items) {
      if (item.type === 'file' && item.path === path) {
        return item.title[currentLang.value] || item.title['en'] 
      }
      if (item.children) {
        const found = findTitleByPath(item.children, path)
        if (found) return found
      }
    }
    return null
  }

  return {
    navigationData,
    isLoading,
    fetchConfig,
    findTitleByPath
  }
}
