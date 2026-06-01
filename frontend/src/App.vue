<template>
  <header>
    <nav>
      <RouterLink to="/">MercApp</RouterLink>
      <div class="nav-links">
        <RouterLink to="/">Catálogo</RouterLink>
        <RouterLink to="/about">Nosotros</RouterLink>
        <RouterLink to="/cart" class="cart-link">
          Carrito
          <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
        </RouterLink>
      </div>
    </nav>
  </header>

  <main>
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <div class="estado-mensaje">Cargando...</div>
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
</script>
