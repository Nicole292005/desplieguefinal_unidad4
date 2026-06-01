import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('mercapp-cart') || '[]'))

  const guardarEnStorage = () => {
    localStorage.setItem('mercapp-cart', JSON.stringify(items.value))
  }

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.cantidad, 0)
  )

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  )

  const agregar = (producto) => {
    const existente = items.value.find(i => i._id === producto._id)
    if (existente) {
      existente.cantidad++
    } else {
      items.value.push({ ...producto, cantidad: 1 })
    }
    guardarEnStorage()
  }

  const quitar = (id) => {
    const index = items.value.findIndex(i => i._id === id)
    if (index === -1) return
    if (items.value[index].cantidad > 1) {
      items.value[index].cantidad--
    } else {
      items.value.splice(index, 1)
    }
    guardarEnStorage()
  }

  const eliminar = (id) => {
    items.value = items.value.filter(i => i._id !== id)
    guardarEnStorage()
  }

  const vaciar = () => {
    items.value = []
    guardarEnStorage()
  }

  return { items, totalItems, total, agregar, quitar, eliminar, vaciar }
})
