const express = require('express');
const cors = require('cors')
//Crear servidor
const app = express();

//Middleware. Habilito para que se puedan enviar JSON a la API
app.use(cors())
app.use(express.json())

app.use('/bpc', require('./routes/bpc'))
app.use('/entesVarios', require('./routes/entesVarios'))
app.use('/updateEntes', require('./routes/updateEntes'))

//instancia de app, para que escuche en el puerto
app.listen(3000, () => {
    console.log("Servidor corriendo");
})