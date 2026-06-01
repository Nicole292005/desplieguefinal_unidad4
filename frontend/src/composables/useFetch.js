import { ref } from 'vue'

export const useFetch = (fn) => {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const ejecutar = async (...args) => {
    loading.value = true
    error.value = null

    try {
      data.value = await fn(...args)
    } catch (e) {
      // reintento simple una vez
      try {
        data.value = await fn(...args)
      } catch (e2) {
        error.value = e2.message
      }
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, ejecutar }
}
