const express = require('express');
const router = express.Router();

const { CompraEntrada, Entrada, User, Espectaculo } = require('../config/dependencies'); // Ajustá la ruta

const comprarEntradaController = require('../controllers/comprarEntradaController')({
  compraEntradaModel: CompraEntrada,
  entradaModel: Entrada,
  userModel: User,
  espectaculoModel: Espectaculo
});

router.post('/', comprarEntradaController.createCompraEntrada);
router.get('/:id', comprarEntradaController.getCompraEntrada);
router.get('/', comprarEntradaController.getAllComprasEntradas);
router.put('/:id', comprarEntradaController.updateCompraEntrada);
router.delete('/:id', comprarEntradaController.deleteCompraEntrada);

module.exports = router;
