const router = require('express').Router();

const { Entrada, User } = require('../config/dependencies');


const entrada = require('../controllers/entradaController')({
  entradaModel: Entrada,
  userModel: User
});



// Rutas para manejar las operaciones de entradas
router.post('/', entrada.createEntrada); // Crear una nueva entrada
router.get('/:id', entrada.getEntrada); // Obtener una entrada por ID
router.get('/', entrada.getAllEntradas); // Obtener todas las entradas
router.put('/:id', entrada.updateEntrada); // Actualizar una entrada por ID
router.delete('/:id', entrada.deleteEntrada); // Eliminar una entrada por ID

module.exports = router;