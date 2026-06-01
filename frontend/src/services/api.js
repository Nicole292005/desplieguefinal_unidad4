const BASE_URL = 'http://localhost:3000/api'

const peticion = async (endpoint, opciones = {}) => {
  const respuesta = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones
  })

  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}))
    throw new Error(error.error || `Error ${respuesta.status}`)
  }

  return respuesta.json()
}

export const apiProductos = {
  listar: () => peticion('/products'),
  obtener: (id) => peticion(`/products/${id}`),
  crear: (datos) => peticion('/products', { method: 'POST', body: JSON.stringify(datos) }),
  actualizar: (id, datos) => peticion(`/products/${id}`, { method: 'PUT', body: JSON.stringify(datos) }),
  eliminar: (id) => peticion(`/products/${id}`, { method: 'DELETE' })
}

export const apiCategorias = {
  listar: () => peticion('/categories')
}
