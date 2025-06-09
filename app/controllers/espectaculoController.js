const { Espectaculo } = require('../config/dependencies');

// Controlador para manejar las operaciones relacionadas con los espectáculos

async function createEspectaculo(req, res) {
    try {
        //correción validacion de tipoSala
        if (req.body.tipoSala == 'SalaTeatro'){
            req.body.precioEntrada= undefined;
        }
        // Validación: precio A debe ser el doble de B si es SalaTeatro
        if (req.body.tipoSala === 'SalaTeatro') {
            if (typeof req.body.precioEntradaA !== 'number' || typeof req.body.precioEntradaB !== 'number') {
                return res.status(400).json({ message: 'Debes especificar precioEntradaA y precioEntradaB para SalaTeatro.' });
            }
            if (req.body.precioEntradaA !== req.body.precioEntradaB * 2) {
                return res.status(400).json({ message: 'precioEntradaA debe ser el doble de precioEntradaB.' });
            }
        }
        //validacion de superposición de horarios y fechas
        const { fechaFuncion, horaFuncion, salaId } = req.body;
        const espectaculoSolapado = await Espectaculo.findOne({
            salaId,
            fechaFuncion,
            horaFuncion
        });
        if (espectaculoSolapado) {
            return res.status(400).json({ message: 'Ya existe un espectáculo en esta sala a la misma hora y fecha.' });
        }
        //validacion hora libre entre shows
        const espectaculosPrevios = await Espectaculo.find({
            salaId,
            fechaFuncion,
            horaFuncion: { $lt: horaFuncion }
        }).sort({ horaFuncion: -1 }).limit(1);
        if (espectaculosPrevios.length > 0) {
            const ultimoEspectaculo = espectaculosPrevios[0];
            const duracionEspectaculo = ultimoEspectaculo.duracion; // Duración en minutos
            const horaFinUltimo = new Date(`${fechaFuncion}T${ultimoEspectaculo.horaFuncion}`);
            horaFinUltimo.setMinutes(horaFinUltimo.getMinutes() + duracionEspectaculo);
            const horaInicioNuevo = new Date(`${fechaFuncion}T${horaFuncion}`);
            if (horaInicioNuevo < horaFinUltimo) {
                return res.status(400).json({ message: 'Debe haber al menos una hora libre entre espectáculos.' });
            }
        }


        // Validación: solo precioEntrada para Anfiteatro
        if (req.body.tipoSala === 'Anfiteatro') {
            if (typeof req.body.precioEntrada !== 'number') {
                return res.status(400).json({ message: 'Debes especificar precioEntrada para Anfiteatro.' });
            }
        }
        // Validación: no permitir espectáculos en el pasado
        const hoy = new Date();
        const fecha = new Date(req.body.fechaFuncion);
        if (fecha < hoy) {
            return res.status(400).json({ message: 'No se pueden crear espectáculos en fechas pasadas.' });
        }
        const newEspectaculo = await Espectaculo.create(req.body);
        res.status(201).json(newEspectaculo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el espectáculo', error: error.message });
    }
}

async function getEspectaculo(req, res) {
    try {
        const espectaculoData = await Espectaculo.findById(req.params.id);
        if (!espectaculoData) {
            return res.status(404).json({ message: 'Espectáculo no encontrado' });
        }
        res.json(espectaculoData);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el espectáculo', error: error.message });
    }
}

async function updateEspectaculo(req, res) {
    try {
        const updatedEspectaculo = await Espectaculo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedEspectaculo) {
            return res.status(404).json({ message: 'Espectáculo no encontrado' });
        }
        res.json(updatedEspectaculo);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el espectáculo', error: error.message });
    }
}

async function deleteEspectaculo(req, res) {
    try {
        const deletedEspectaculo = await Espectaculo.findByIdAndDelete(req.params.id);
        if (!deletedEspectaculo) {
            return res.status(404).json({ message: 'Espectáculo no encontrado' });
        }
        res.json({ message: 'Espectáculo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el espectáculo', error: error.message });
    }
}

async function getAllEspectaculos(req, res) {
    try {
        const ahora = new Date();
        let filtro = {};
        if (req.query.tipo === 'proximos') {
            // Espectáculos futuros (aún se pueden comprar entradas)
            filtro = { $or: [
                { fechaFuncion: { $gt: ahora } },
                { fechaFuncion: { $eq: ahora }, horaFuncion: { $gt: ahora.toTimeString().slice(0,5) } }
            ] };
        } else if (req.query.tipo === 'anteriores') {
            // Espectáculos pasados (no se pueden comprar entradas)
            filtro = { $or: [
                { fechaFuncion: { $lt: ahora } },
                { fechaFuncion: { $eq: ahora }, horaFuncion: { $lte: ahora.toTimeString().slice(0,5) } }
            ] };
        }
        const espectaculos = await Espectaculo.find(filtro);
        res.json(espectaculos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los espectáculos', error: error.message });
    }
}

module.exports = {
    createEspectaculo,
    getEspectaculo,
    updateEspectaculo,
    deleteEspectaculo,
    getAllEspectaculos
};