const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const espectaculoRoute = require('../routes/espectaculoRoute');
const salaRoute  = require('../routes/salaRoute');
const userRoute  = require('../routes/userRoute');
const compraEntradaRoute = require('../routes/comprarEntradaRoute');
const entradaRoute = require('../routes/entradaRoute');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Se montan los routers bajo /api
app.use('/api/espectaculos', espectaculoRoute);
app.use('/api/salas',   salaRoute);
app.use('/api/users',   userRoute);
app.use('/api/entradas', entradaRoute);
app.use('/api/compras-entradas', compraEntradaRoute);



// Manejador global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

module.exports = app;