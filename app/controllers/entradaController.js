const { Espectaculo } = require('../config/dependencies');


module.exports = ({entradaModel}) => {

    async function createEntrada(req, res) {
        try {
            // Buscar el espectáculo para obtener la sala y tipoSala
            const espectaculo = await Espectaculo.findById(req.body.espectaculoId).populate('salaId');
            if (!espectaculo) {
                return res.status(404).json({ message: 'Espectáculo no encontrado' });
            }

            // Validar cantidad máxima según tipo de sala
            let maxCantidad = 0;
            if (espectaculo.tipoSala === 'SalaTeatro') {
                maxCantidad = 70;
            } else if (espectaculo.tipoSala === 'Anfiteatro') {
                maxCantidad = 120;
            }

            if (req.body.cantidad > maxCantidad) {
                return res.status(400).json({ message: `La cantidad máxima para esta sala es ${maxCantidad}` });
            }

            const newEntrada = await entradaModel.create(req.body);
            res.status(201).json(newEntrada);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la entrada', error });
        }
    }
    async function getEntrada(req, res) {
        try {
            const entradaData = await entradaModel.findById(req.params.id);
            if (!entradaData) {
                return res.status(404).json({ message: 'Entrada no encontrada' });
            }
            res.json(entradaData);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la entrada', error });
        }
    }

    async function updateEntrada(req, res) {
        try {
            const updatedEntrada = await entradaModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedEntrada) {
                return res.status(404).json({ message: 'Entrada no encontrada' });
            }
            res.json(updatedEntrada);
        }catch (error) {
            res.status(500).json({ message: 'Error al actualizar la entrada', error });
        }
    }

    async function deleteEntrada(req, res) {
        try {
            const deletedEntrada = await entradaModel.findByIdAndDelete(req.params.id);
            if (!deletedEntrada) {
                return res.status(404).json({ message: 'Entrada no encontrada' });
            }
            res.json({ message: 'Entrada eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la entrada', error });
        }
    }

    async function getAllEntradas(req, res) {
        try {
            const entradas = await entradaModel.find();
            res.json(entradas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las entradas', error });
        }
    }

    return {
        createEntrada,
        getEntrada,
        updateEntrada,
        deleteEntrada,
        getAllEntradas
    };


}