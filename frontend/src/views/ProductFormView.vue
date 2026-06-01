<template>
  <div class="formulario">
    <h1>{{ esEdicion ? 'Editar producto' : 'Nuevo producto' }}</h1>

    <form @submit.prevent="enviar" novalidate>
      <div class="campo">
        <label>Nombre</label>
        <input v-model="form.nombre" type="text" />
        <span v-if="errores.nombre" class="error-campo">{{ errores.nombre }}</span>
      </div>

      <div class="campo">
        <label>Descripción</label>
        <textarea v-model="form.descripcion" rows="3"></textarea>
        <span v-if="errores.descripcion" class="error-campo">{{ errores.descripcion }}</span>
      </div>

      <div class="campo">
        <label>Precio</label>
        <input v-model.number="form.precio" type="number" min="0.01" step="0.01" />
        <span v-if="errores.precio" class="error-campo">{{ errores.precio }}</span>
      </div>

      <div class="campo">
        <label>Stock</label>
        <input v-model.number="form.stock" type="number" min="0" />
        <span v-if="errores.stock" class="error-campo">{{ errores.stock }}</span>
      </div>

      <div class="campo">
        <label>Categoría</label>
        <select v-model="form.categoryId">
          <option value="">Selecciona una categoría</option>
          <option v-for="cat in categorias" :key="cat._id" :value="cat._id">
            {{ cat.nombre }}
          </option>
        </select>
        <span v-if="errores.categoryId" class="error-campo">{{ errores.categoryId }}</span>
      </div>

      <div class="campo">
        <label>URL de imagen</label>
        <input v-model="form.imagen" type="url" placeholder="https://..." />
        <span v-if="errores.imagen" class="error-campo">{{ errores.imagen }}</span>
      </div>

      <div class="form-acciones">
        <button type="submit" class="btn-primary" :disabled="guardando">
          {{ guardando ? 'Guardando...' : 'Guardar' }}
        </button>
        <RouterLink to="/" class="btn-secundario">Cancelar</RouterLink>
      </div>

      <div v-if="errorServidor" class="estado-error">{{ errorServidor }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiProductos, apiCategorias } from '@/services/api'

const route = useRoute()
const router = useRouter()

const esEdicion = computed(() => !!route.params.id && route.path.includes('edit'))
const guardando = ref(false)
const errorServidor = ref('')
const categorias = ref([])

const form = reactive({
  nombre: '',
  descripcion: '',
  precio: null,
  stock: 0,
  categoryId: '',
  imagen: ''
})

const errores = reactive({
  nombre: '', descripcion: '', precio: '', stock: '', categoryId: '', imagen: ''
})

const validar = () => {
  let valido = true
  Object.keys(errores).forEach(k => errores[k] = '')

  if (!form.nombre || form.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres'
    valido = false
  }
  if (!form.descripcion || form.descripcion.trim().length < 10) {
    errores.descripcion = 'La descripción debe tener al menos 10 caracteres'
    valido = false
  }
  if (!form.precio || form.precio <= 0) {
    errores.precio = 'El precio debe ser mayor a 0'
    valido = false
  }
  if (form.stock < 0) {
    errores.stock = 'El stock no puede ser negativo'
    valido = false
  }
  if (!form.categoryId) {
    errores.categoryId = 'La categoría es obligatoria'
    valido = false
  }
  if (form.imagen && !/^https?:\/\/.+/.test(form.imagen)) {
    errores.imagen = 'La URL de imagen no es válida'
    valido = false
  }

  return valido
}

const enviar = async () => {
  if (!validar()) return
  guardando.value = true
  errorServidor.value = ''

  try {
    if (esEdicion.value) {
      await apiProductos.actualizar(route.params.id, form)
    } else {
      await apiProductos.crear(form)
    }
    router.push('/')
  } catch (e) {
    errorServidor.value = e.message
  } finally {
    guardando.value = false
  }
}

onMounted(async () => {
  categorias.value = await apiCategorias.listar().catch(() => [])

  if (esEdicion.value) {
    const producto = await apiProductos.obtener(route.params.id).catch(() => null)
    if (producto) {
      form.nombre = producto.nombre
      form.descripcion = producto.descripcion
      form.precio = producto.precio
      form.stock = producto.stock
      form.categoryId = producto.categoryId?._id || producto.categoryId || ''
      form.imagen = producto.imagen || ''
    }
  }
})
</script>
