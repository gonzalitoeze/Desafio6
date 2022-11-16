const express = require('express');
const app = express();
const PORT = 8080;


const server = app.listen(PORT, () => {
    console.log(`Server listening from: ${server.address().port}`);
});
server.on('error', error => console.log(`error ${error}`));