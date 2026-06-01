import { ref, computed } from 'vue'
import { useFetch } from './useFetch'
import { apiProductos, apiCategorias } from '@/services/api'

export const useProducts = () => {
  const busqueda = ref('')
  const categoriaSeleccionada = ref('')

  const { data: productos, loading: loadingProductos, error: errorProductos, ejecutar: cargarProductos } =
    useFetch(apiProductos.listar)

  const { data: categorias, loading: loadingCategorias, error: errorCategorias, ejecutar: cargarCategorias } =
    useFetch(apiCategorias.listar)

  const productosFiltrados = computed(() => {
    if (!productos.value) return []

    return productos.value.filter(p => {
      const coincideBusqueda =
        p.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.value.toLowerCase())

      const coincideCategoria =
        !categoriaSeleccionada.value ||
        p.categoryId?._id === categoriaSeleccionada.value ||
        p.categoryId === categoriaSeleccionada.value

      return coincideBusqueda && coincideCategoria
    })
  })

  const inicializar = () => {
    cargarProductos()
    cargarCategorias()
  }

  return {
    productos,
    categorias,
    productosFiltrados,
    busqueda,
    categoriaSeleccionada,
    loadingProductos,
    loadingCategorias,
    errorProductos,
    errorCategorias,
    inicializar,
    cargarProductos
  }
}
