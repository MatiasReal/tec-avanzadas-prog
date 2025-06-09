const router = require ('express').Router();
const userController = require('../controllers/userController');

// Rutas para manejar las operaciones de usuarios
router.post('/', userController.createUser); // Crear un nuevo usuario
router.get('/:id', userController.getUser); // Obtener un usuario por ID
router.get('/', userController.getAllUsers); // Obtener todos los usuarios
router.put('/:id', userController.updateUser); // Actualizar un usuario por ID
router.delete('/:id', userController.deleteUser); // Eliminar un usuario por ID

module.exports = router;