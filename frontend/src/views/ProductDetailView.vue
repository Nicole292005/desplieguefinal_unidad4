<template>
  <div class="detalle">
    <div v-if="loading" class="estado-mensaje">Cargando producto...</div>
    <div v-else-if="error" class="estado-error">{{ error }}</div>

    <div v-else-if="data" class="detalle-contenido">
      <RouterLink to="/" class="btn-volver">Volver al catálogo</RouterLink>

      <div class="detalle-grid">
        <img
          :src="data.imagen || 'https://placehold.co/400x300?text=Sin+imagen'"
          :alt="data.nombre"
          class="detalle-img"
        />

        <div class="detalle-info">
          <span class="product-category">{{ data.categoryId?.nombre || 'Sin categoría' }}</span>
          <h1>{{ data.nombre }}</h1>
          <p class="detalle-desc">{{ data.descripcion }}</p>

          <div class="detalle-precio">${{ data.precio.toFixed(2) }}</div>
          <div class="detalle-stock" :class="{ 'sin-stock': data.stock === 0 }">
            {{ data.stock > 0 ? `${data.stock} unidades disponibles` : 'Sin stock' }}
          </div>

          <div class="detalle-acciones">
            <button
              class="btn-primary"
              :disabled="data.stock === 0"
              @click="cartStore.agregar(data)"
            >
              Agregar al carrito
            </button>
            <RouterLink :to="`/product/${data._id}/edit`" class="btn-secundario">Editar</RouterLink>
            <button class="btn-peligro" @click="confirmarEliminar">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '@/composables/useFetch'
import { apiProductos } from '@/services/api'
import { useCartStore } from '@/stores/cartStore'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const { data, loading, error, ejecutar } = useFetch(apiProductos.obtener)

const confirmarEliminar = async () => {
  if (!confirm('¿Seguro que deseas eliminar este producto?')) return
  try {
    await apiProductos.eliminar(route.params.id)
    router.push('/')
  } catch (e) {
    alert('Error al eliminar el producto')
  }
}

onMounted(() => ejecutar(route.params.id))
</script>
