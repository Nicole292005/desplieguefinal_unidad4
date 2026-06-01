<template>
  <div class="home">
    <div class="home-header">
      <h1>Catálogo de Productos</h1>
      <RouterLink to="/product/new" class="btn-primary">+ Nuevo producto</RouterLink>
    </div>

    <div class="filtros">
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar por nombre o descripción..."
        class="input-busqueda"
      />
      <select v-model="categoriaSeleccionada" class="select-categoria">
        <option value="">Todas las categorías</option>
        <option
          v-for="cat in categorias"
          :key="cat._id"
          :value="cat._id"
        >
          {{ cat.nombre }}
        </option>
      </select>
    </div>

    <div v-if="loadingProductos" class="estado-mensaje">Cargando productos...</div>
    <div v-else-if="errorProductos" class="estado-error">{{ errorProductos }}</div>
    <div v-else-if="productosFiltrados.length === 0" class="estado-mensaje">No se encontraron productos.</div>

    <div v-else class="productos-grid">
      <ProductCard
        v-for="producto in productosFiltrados"
        :key="producto._id"
        :product="producto"
        @added-to-cart="agregarAlCarrito"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'
import { useCartStore } from '@/stores/cartStore'

const {
  productosFiltrados,
  categorias,
  busqueda,
  categoriaSeleccionada,
  loadingProductos,
  errorProductos,
  inicializar
} = useProducts()

const cartStore = useCartStore()

const agregarAlCarrito = (producto) => {
  cartStore.agregar(producto)
}

onMounted(() => inicializar())
</script>
