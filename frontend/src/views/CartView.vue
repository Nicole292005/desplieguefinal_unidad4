<template>
  <div class="carrito">
    <h1>Carrito de compras</h1>

    <div v-if="cartStore.items.length === 0" class="estado-mensaje">
      Tu carrito está vacío.
      <RouterLink to="/">Ver catálogo</RouterLink>
    </div>

    <div v-else>
      <div class="carrito-item" v-for="item in cartStore.items" :key="item._id">
        <img
          :src="item.imagen || 'https://placehold.co/80x80?text=?'"
          :alt="item.nombre"
          class="carrito-img"
        />
        <div class="carrito-info">
          <h3>{{ item.nombre }}</h3>
          <span>${{ item.precio.toFixed(2) }}</span>
        </div>
        <div class="carrito-cantidad">
          <button @click="cartStore.quitar(item._id)">-</button>
          <span>{{ item.cantidad }}</span>
          <button @click="cartStore.agregar(item)">+</button>
        </div>
        <div class="carrito-subtotal">${{ (item.precio * item.cantidad).toFixed(2) }}</div>
        <button class="btn-peligro-sm" @click="cartStore.eliminar(item._id)">Quitar</button>
      </div>

      <div class="carrito-footer">
        <span class="carrito-total">Total: ${{ cartStore.total.toFixed(2) }}</span>
        <button class="btn-secundario" @click="cartStore.vaciar()">Vaciar carrito</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
</script>
