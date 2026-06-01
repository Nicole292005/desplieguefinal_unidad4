import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import ProductFormView from '@/views/ProductFormView.vue'

const CartView = () => import('@/views/CartView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

const rutas = [
  { path: '/', component: HomeView },
  { path: '/product/new', component: ProductFormView },
  { path: '/product/:id/edit', component: ProductFormView },
  { path: '/product/:id', component: ProductDetailView },
  { path: '/cart', component: CartView },
  { path: '/about', component: AboutView },
  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

const enrutador = createRouter({
  history: createWebHistory(),
  routes: rutas
})

export default enrutador
