<template>
  <div class="product-card">
    <RouterLink :to="`/product/${product._id}`">
      <img
        :src="product.imagen || 'https://placehold.co/300x200?text=Sin+imagen'"
        :alt="product.nombre"
        class="product-img"
      />
    </RouterLink>

    <div class="product-body">
      <span class="product-category">{{ product.categoryId?.nombre || 'Sin categoria' }}</span>
      <h3 class="product-name">
        <RouterLink :to="`/product/${product._id}`">{{ product.nombre }}</RouterLink>
      </h3>
      <p class="product-desc">{{ product.descripcion }}</p>

      <div class="product-footer">
        <span class="product-price">${{ product.precio.toFixed(2) }}</span>
        <span class="product-stock" :class="{ 'sin-stock': product.stock === 0 }">
          {{ product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock' }}
        </span>
      </div>

      <button
        class="btn-agregar"
        :disabled="product.stock === 0"
        @click="$emit('added-to-cart', product)"
      >
        {{ product.stock > 0 ? 'Agregar al carrito' : 'Sin stock' }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['added-to-cart'])
</script>
