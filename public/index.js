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
    const img = document.createElement('img');
    img.setAttribute('src', producto.thumbnail);
    img.setAttribute('width', '25')
    foto.appendChild(img);
    linea.appendChild(foto);

    document.getElementById('productos').appendChild(linea);
}

socket.on('nuevaConexion', data => {
    data.forEach(producto => {
        const linea = document.createElement('tr');

        const nombre = document.createElement('td');
        nombre.innerHTML = producto.nombre;
        linea.appendChild(nombre);

        const precio = document.createElement('td');
        precio.innerHTML = producto.precio;
        linea.appendChild(precio);

        const foto = document.createElement('td');
        const img = document.createElement('img');
        img.setAttribute('src', producto.thumbnail);
        img.setAttribute('width', '25');
        foto.appendChild(img);
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
    socket.emit('nuevoProducto', producto);
    return false;
};

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> <div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
};

socket.on('messages', function(data) { render(data); });

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    };
    socket.emit('nuevoMensaje', mensaje);
    return false;
}