import { ref, readonly } from 'vue'

const currentLang = ref(localStorage.getItem('lang') || 'en')

export function useLanguage() {
  const setLanguage = (lang) => {
    currentLang.value = lang
    localStorage.setItem('lang', lang)
  }

  const toggleLanguage = () => {
    const newLang = currentLang.value === 'en' ? 'ru' : 'en'
    setLanguage(newLang)
  }

  return {
    currentLang: readonly(currentLang), 
    setLanguage,
    toggleLanguage
  }
}
