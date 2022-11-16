const { Socket } = require('dgram');
const express = require('express');
const app = express();
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require('./Contenedor/ContenedorFs')
const PORT = 8080;
const publicRoute = './public';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicRoute));

//CONTENEDOR

const productos = new Contenedor('./src/DB/productos.txt');

app.get('/', (req, res) => {
    res.send('index.html', { root: publicRoute });
})
const server = HttpServer.listen(PORT, () => {
    console.log(`Server listening from: ${server.address().port}`);
});
server.on('error', error => console.log(`error ${error}`));

io.on('connection', (socket) => {
    console.log('Nuevo cliente');

    const listaProductos = productos.getAll();
    socket.emit('producto', listaProductos);

    socket.on("new-producto", (data) => {
        productos.save(data);
        const lista = productos.getAll();
        io.socket.emit('producto', data);
    });
});