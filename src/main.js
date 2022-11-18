const moment = require('moment')
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

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//CONTENEDOR

const productos = new Contenedor('./src/DB/productos.txt');
const messages = new Contenedor('./src/DB/mensajes.txt');

app.get('/', (req, res) => {
    res.send('index.html', { root: publicRoute });
});
// app.post('/productos', (req, res) => {
//     res
// })
const server = httpServer.listen(PORT, () => {
    console.log(`Server listening from: ${server.address().port}`);
});
server.on('error', error => console.log(`error ${error}`));

io.on('connection', async (socket) => {
    console.log('Nuevo cliente');

    const listaProductos = await productos.getAll();
    socket.emit('nuevaConexion', listaProductos);

    socket.on("nuevoProducto", (data) => {
        productos.save(data);
        io.socket.emit('producto', data);
    });

    const listaMensajes = await messages.getAll();
    socket.emit('messages', listaMensajes);

    socket.emit('messages', messages);
    socket.on('new-message', data => {
        data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss');
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});