document.addEventListener("DOMContentLoaded", function() {
  
  const getCharacters = async () => {
		const response = await fetch("./datos.json");
		const data = await response.json();
		let characters = data;
		characters.forEach((character) => {
			let div = document.createElement("div");
			div.innerHTML = `
        <h2>${character.nombre}</h2>
        <img src="${character.imagen}">
        <p>${character.descripcion}</p>
        <p>${character.precio}</p>
        <button class="comprar" data-id="${character.id}">Agregar al Carrito</button>
      `;
			listaProductos.appendChild(div);
		});
	};
	getCharacters();


  const listaProductos = document.getElementById("lista-productos");
  const subtitulo = document.getElementById("subtitulo");
  const listaCarrito = document.getElementById("lista-carrito");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
  const detalleProducto = document.getElementById("detalle-producto");
  const nombreProducto = document.getElementById("nombre-producto");
  const descripcionProducto = document.getElementById("descripcion-producto");
  const volverBtn = document.getElementById("volver");
  const pagarBtn = document.getElementById("pagar");

  let carrito = [];

  function mostrarProductos() {
    listaProductos.innerHTML = "";
    productos.forEach(producto => {
      const item = document.createElement("div");
      item.classList.add("producto");
      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p> Precio: ${producto.precio}</p>
        <p>${producto.descripcion}</p>
        <button class="comprar" data-id="${producto.id}">Agregar al Carrito</button>
      `;
      listaProductos.appendChild(item);
    });
  }

  function mostrarDetalleProducto(producto) {
    nombreProducto.textContent = producto.nombre;
    descripcionProducto.textContent = producto.descripcion;
    detalleProducto.style.display = "block";
  }

  async function agregarAlCarrito(event) {
		const response = await fetch("./datos.json");
		const productos = await response.json();
		if (event.target.classList.contains("comprar")) {
			const productoId = parseInt(event.target.dataset.id);
			const producto = productos.find((p) => p.id === productoId);
			if (producto) {
				const productoEnCarrito = carrito.find((item) => item.id === productoId);
				if (productoEnCarrito) {
					productoEnCarrito.cantidad += 1;
				} else {
					carrito.push({ ...producto, cantidad: 1 });
				}
        localStorage.setItem('carrito', JSON.stringify(carrito));
				mostrarCarrito();
			}
		} else if (event.target.tagName === "A") {
			const productoId = parseInt(event.target.dataset.id);

			const producto = productos.find((p) => p.id === productoId);
			if (producto) {
				mostrarDetalleProducto(producto);
			}
		}
	}
  function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach(item => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span>${item.nombre} - $${item.precio} x${item.cantidad}</span>
      `;
      listaCarrito.appendChild(listItem);
    });
    mostrarTotalPrecio();
  
  }

  function mostrarTotalPrecio() {
    const totalPrecio = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    const totalPrecioElement = document.getElementById("total-precio");
    totalPrecioElement.textContent = `Total: $${totalPrecio}`;
  }

  function vaciarCarrito() {
    carrito = [];
    listaCarrito.innerHTML = "";
    mostrarTotalPrecio();
    localStorage.removeItem('carrito');
  }

  function volverAInicio() {
    detalleProducto.style.display = "none";
  }

  function pagar() {
    window.location.href = "http://127.0.0.1:5500/panchi/PaginaPago/index.html";
  }

  listaProductos.addEventListener("click", agregarAlCarrito);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  volverBtn.addEventListener("click", volverAInicio);
  pagarBtn.addEventListener("click", pagar);

  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  mostrarCarrito();

  mostrarProductos();
});
