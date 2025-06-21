// Datos de productos simulados
const productos = [
  {
    id: 1,
    titulo: "Auriculares Bluetooth Inalámbricos",
    precio: 59.99,
    imagen: "https://via.placeholder.com/200x180?text=Auriculares",
    descripcion: "Auriculares inalámbricos de alta calidad con cancelación de ruido."
  },
  {
    id: 2,
    titulo: "Smartphone con Pantalla AMOLED",
    precio: 399.99,
    imagen: "https://via.placeholder.com/200x180?text=Smartphone",
    descripcion: "Último modelo de smartphone con pantalla AMOLED impresionante."
  },
  {
    id: 3,
    titulo: "Cargador Portátil 10000mAh",
    precio: 25.00,
    imagen: "https://via.placeholder.com/200x180?text=Cargador",
    descripcion: "Cargador portátil compacto y potente para todos tus dispositivos."
  },
  {
    id: 4,
    titulo: "Ratón Inalámbrico",
    precio: 15.49,
    imagen: "https://via.placeholder.com/200x180?text=Ratón",
    descripcion: "Ratón inalámbrico ergonómico con larga duración de batería."
  },
  {
    id: 5,
    titulo: "Laptop Ultraligera 14''",
    precio: 899.99,
    imagen: "https://via.placeholder.com/200x180?text=Laptop",
    descripcion: "Laptop ultraligera, ideal para trabajo y estudio, con procesador rápido."
  },
  {
    id: 6,
    titulo: "Smartwatch Deportivo",
    precio: 129.99,
    imagen: "https://via.placeholder.com/200x180?text=Smartwatch",
    descripcion: "Smartwatch con monitor de ritmo cardíaco y GPS integrado."
  },
  {
    id: 7,
    titulo: "Altavoz Bluetooth Portátil",
    precio: 45.00,
    imagen: "https://via.placeholder.com/200x180?text=Altavoz",
    descripcion: "Altavoz portátil resistente al agua con sonido potente."
  },
  {
    id: 8,
    titulo: "Cámara de Seguridad WiFi",
    precio: 75.50,
    imagen: "https://via.placeholder.com/200x180?text=Cámara",
    descripcion: "Cámara de seguridad con visión nocturna y conexión WiFi."
  }
];

// Carrito guardado en localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Página principal: mostrar productos
function mostrarProductos() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = '';
  productos.forEach(producto => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.titulo}" />
      <div class="product-title">${producto.titulo}</div>
      <div class="product-price">$${producto.precio.toFixed(2)}</div>
      <button onclick="verProducto(${producto.id})">Ver Detalles</button>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
    `;
    grid.appendChild(div);
  });
}

function verProducto(id) {
  // Guardar producto seleccionado y redirigir a product.html
  localStorage.setItem('productoSeleccionado', id);
  window.location.href = 'product.html';
}

// Página producto: mostrar detalles del producto seleccionado
function mostrarDetallesProducto() {
  const container = document.getElementById('productDetail');
  if (!container) return;

  const id = parseInt(localStorage.getItem('productoSeleccionado'));
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    container.innerHTML = '<p>Producto no encontrado.</p>';
    return;
  }

  container.innerHTML = `
    <div class="product-detail-container">
      <img src="${producto.imagen}" alt="${producto.titulo}" style="max-width:300px;"/>
      <h2>${producto.titulo}</h2>
      <p>${producto.descripcion}</p>
      <h3>$${producto.precio.toFixed(2)}</h3>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
      <button onclick="window.history.back()">Volver</button>
    </div>
  `;
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ id: id, cantidad: 1 });
  }
  guardarCarrito();
  alert('¡Producto agregado al carrito!');
}

// Página carrito: mostrar productos del carrito
function mostrarCarrito() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  if (carrito.length === 0) {
    container.innerHTML = '<p>Tu carrito está vacío.</p>';
    return;
  }

  container.innerHTML = '';

  carrito.forEach(itemCarrito => {
    const producto = productos.find(p => p.id === itemCarrito.id);
    if (!producto) return;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.titulo}" />
      <div class="cart-item-title">${producto.titulo}</div>
      <div class="cart-item-qty">Cantidad: ${itemCarrito.cantidad}</div>
      <div class="cart-item-price">$${(producto.precio * itemCarrito.cantidad).toFixed(2)}</div>
      <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
    `;
    container.appendChild(div);
  });
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  mostrarCarrito();
}

// Página checkout: manejar formulario de compra
function manejarCheckout() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('¡Pedido realizado! Gracias por tu compra.');
    carrito = [];
    guardarCarrito();
    window.location.href = 'index.html';
  });
}

// Página login: manejar formularios de inicio de sesión y registro (demo)
function manejarLoginRegistro() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Sesión iniciada (demo)');
      window.location.href = 'profile.html';
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Registro exitoso (demo)');
      window.location.href = 'profile.html';
    });
  }
}

// Página perfil: mostrar info de usuario (demo) y botón de cerrar sesión
function cargarPerfil() {
  const container = document.getElementById('profileInfo');
  if (!container) return;

  container.innerHTML = `
    <p><strong>Nombre:</strong> Usuario Demo</p>
    <p><strong>Email:</strong> demo@ejemplo.com</p>
  `;

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      alert('Sesión cerrada');
      window.location.href = 'index.html';
    });
  }
}

// Detectar página y ejecutar funciones apropiadas
document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
  mostrarDetallesProducto();
  mostrarCarrito();
  manejarCheckout();
  manejarLoginRegistro();
  cargarPerfil();

  // Botón checkout en página carrito
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }
});
