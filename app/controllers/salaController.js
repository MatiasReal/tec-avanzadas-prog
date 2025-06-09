const { Sala } = require('../config/dependencies');

async function createSala(req, res) {
    try {
        const newSala = await Sala.create(req.body);
        res.status(201).json(newSala);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la sala', error: error.message });
    }
}

async function getSala(req, res) {
    try {
        const salaData = await Sala.findById(req.params.id);
        if (!salaData) {
            return res.status(404).json({ message: 'Sala no encontrada' });
        }
        res.json(salaData);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la sala', error: error.message });
    }
}

async function updateSala(req, res) {
    try {
        const updatedSala = await Sala.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedSala) {
            return res.status(404).json({ message: 'Sala no encontrada' });
        }
        res.json(updatedSala);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar la sala', error: error.message });
    }
}

async function deleteSala(req, res) {
    try {
        const deletedSala = await Sala.findByIdAndDelete(req.params.id);
        if (!deletedSala) {
            return res.status(404).json({ message: 'Sala no encontrada' });
        }
        res.json({ message: 'Sala eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la sala', error: error.message });
    }
}

async function getAllSalas(req, res) {
    try {
        const salas = await Sala.find();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las salas', error: error.message });
    }
}

module.exports = {
    createSala,
    getSala,
    updateSala,
    deleteSala,
    getAllSalas
};