const socket = io();

function renderProducto(producto) {
    const linea = document.createElement('tr');

    const nombre = document.createElement('td');
    nombre.innerHTML = producto.nombre;
    linea.appendChild(nombre);

    const precio = document.createElement('td');
    precio.innerHTML = producto.precio;
    linea.appendChild(precio);

    const foto = document.createElement('td');
    foto.innerHTML = producto.thumbnail;
    linea.appendChild(foto);

    document.getElementById('productos').appendChild(linea);
}

socket.on('nueva-conexion', data => {
    data.forEach(producto => {
        const linea = document.createElement('tr');

        const nombre = document.createElement('td');
        nombre.innerHTML = producto.nombre;
        linea.appendChild(nombre);

        const precio = document.createElement('td');
        precio.innerHTML = producto.precio;
        linea.appendChild(precio);

        const foto = document.createElement('td');
        foto.innerHTML = producto.thumbnail;
        linea.appendChild(foto);

        document.getElementById('productos').appendChild(linea);
    });
});

socket.on('productos', data => {
    const linea = document.createElement('tr');

    const nombre = document.createElement('td');
    nombre.innerHTML = data.nombre;
    linea.appendChild(nombre);

    const precio = document.createElement('td');
    precio.innerHTML = data.precio;
    linea.appendChild(precio);

    const foto = document.createElement('td');
    foto.innerHTML = data.thumbnail;
    linea.appendChild(foto);

    document.getElementById('productos').appendChild(linea);
});

function addProducto (e) {
    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        thumbnail: document.getElementById("thumbnail").value
    };
    socket.emit('new-product', producto);
    return false;
}
