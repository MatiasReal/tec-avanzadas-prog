const router = require('express').Router();
const espectaculoController = require('../controllers/espectaculoController');

// Rutas para manejar las operaciones de espectáculos
router.post('/', espectaculoController.createEspectaculo); // Crear un nuevo espectáculo
router.get('/:id', espectaculoController.getEspectaculo); // Obtener un espectáculo por ID
router.get('/', espectaculoController.getAllEspectaculos); // Obtener todos los espectáculos
router.put('/:id', espectaculoController.updateEspectaculo); // Actualizar un espectáculo por ID
router.delete('/:id', espectaculoController.deleteEspectaculo); // Eliminar un espectáculo por ID

module.exports = router;