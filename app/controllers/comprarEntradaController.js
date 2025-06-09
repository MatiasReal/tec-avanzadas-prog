module.exports = ({ compraEntradaModel, entradaModel, userModel, espectaculoModel }) => {

async function createCompraEntrada(req, res) {
    try {
        const { entradaId, userId, cantidadEntradas } = req.body;

        // Buscar la entrada
        const entrada = await entradaModel.findById(entradaId);
        if (!entrada) {
            return res.status(404).json({ message: 'Entrada no encontrada' });
        }

        // Buscar el usuario
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Validar stock
        if (entrada.cantidad < parseInt(cantidadEntradas)) {
            return res.status(400).json({ message: 'No hay suficientes entradas disponibles' });
        }

        // Buscar el espectáculo asociado a la entrada
        const espectaculo = await espectaculoModel.findById(entrada.espectaculoId);
        if (!espectaculo) {
            return res.status(404).json({ message: 'Espectáculo no encontrado' });
        }

        // Calcular el precio final según el tipo de sala
        let precioFinal = 0;
        if (espectaculo.tipoSala === 'SalaTeatro') {
            const tipoEntrada = req.body.tipoEntrada || 'A'; 
            if (tipoEntrada === 'A') {
                precioFinal = espectaculo.precioEntradaA * parseInt(cantidadEntradas);
            } else {
                precioFinal = espectaculo.precioEntradaB * parseInt(cantidadEntradas);
            }
        } else if (espectaculo.tipoSala === 'Anfiteatro') {
            precioFinal = espectaculo.precioEntrada * parseInt(cantidadEntradas);
        }

        // Crear la compra
        const newCompra = await compraEntradaModel.create({
            entradaId,
            userId,
            cantidadEntradas: parseInt(cantidadEntradas),
            precioFinal
        });

        // Actualizar stock
        await entradaModel.updateOne(
            { _id: entradaId },
            { $inc: { cantidad: -parseInt(cantidadEntradas) } }
        );

        res.status(201).json(newCompra);

    } catch (error) {
        res.status(500).json({ message: 'Error al crear la compra de entrada', error: error.message });
    }
}



    async function getCompraEntrada(req, res) {
        try {
            const compraData = await compraEntradaModel.findById(req.params.id).populate('entrada').populate('user');
            if (!compraData) {
                return res.status(404).json({ message: 'Compra de entrada no encontrada' });
            }
            res.json(compraData);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la compra de entrada', error });
        }
    }

    async function updateCompraEntrada(req, res) {
        try {
            const updatedCompra = await compraEntradaModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            if (!updatedCompra) {
                return res.status(404).json({ message: 'Compra de entrada no encontrada' });
            }
            res.json(updatedCompra);
        }
        catch (error) {
            res.status(500).json({ message: 'Error al actualizar la compra de entrada', error });
        }
    }

    async function deleteCompraEntrada(req, res) {
        try {
            const deletedCompra = await compraEntradaModel.findByIdAndDelete(req.params.id);
            if (!deletedCompra) {
                return res.status(404).json({ message: 'Compra de entrada no encontrada' });
            }
            res.json({ message: 'Compra de entrada eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la compra de entrada', error });
        }

    }

    async function getAllComprasEntradas(req, res) {
        try {
            const compras = await compraEntradaModel.find().populate('entrada').populate('user');
            res.json(compras);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las compras de entradas', error });
        }
    }


    return {
        createCompraEntrada,
        getCompraEntrada,
        updateCompraEntrada,
        deleteCompraEntrada,
        getAllComprasEntradas
    };


};