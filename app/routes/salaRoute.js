const router = require('express').Router();
const salaController = require('../controllers/salaController');

// Rutas para manejar las operaciones de salas
router.post('/', salaController.createSala); // Crear una nueva sala
router.get('/:id', salaController.getSala); // Obtener una sala por ID
router.get('/', salaController.getAllSalas); // Obtener todas las salas
router.put('/:id', salaController.updateSala); // Actualizar una sala por ID
router.delete('/:id', salaController.deleteSala); // Eliminar una sala por ID

module.exports = router;