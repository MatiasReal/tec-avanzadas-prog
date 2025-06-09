const mongoose = require('mongoose');

const createEspectaculo = require('../models/espectaculoModel');
const createCompraEntrada = require('../models/compraEntradaModel');
const createSala = require('../models/salaModel');
const createUser = require('../models/userModel');
const createEntrada = require('../models/entradaModel');

const Espectaculo = createEspectaculo({ mongoose });
const CompraEntrada = createCompraEntrada({ mongoose });
const Sala = createSala({ mongoose });
const User = createUser({ mongoose });
const Entrada = createEntrada({ mongoose });

module.exports = {
  mongoose,
  Espectaculo,
  CompraEntrada,
  Sala,
  User,
  Entrada
};
