module.exports = ({ mongoose }) => {
    const entradaSchema = new mongoose.Schema({
        espectaculoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Espectaculo',
        required: true
        },
        fechaCompra: {
        type: Date,
        default: Date.now
        },
        cantidad:{
            type: Number,
            required: true
        }
    });
    
    return mongoose.models.Entrada || mongoose.model('Entrada', entradaSchema);

    }