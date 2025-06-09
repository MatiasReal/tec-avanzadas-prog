module.exports = ({ mongoose }) => {
  const compraEntradaSchema = new mongoose.Schema({
    entradaId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Entrada'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    cantidadEntradas: {
      type: Number,
      required: true
    },
    precioFinal: {
      type: Number,
      required: true
    },
    tipoEntrada: {
      type: String,
      enum: ['A', 'B'],
      required: false
    }
  });

  return mongoose.model('CompraEntrada', compraEntradaSchema);
};