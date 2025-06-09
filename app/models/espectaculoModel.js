module.exports = ({ mongoose }) => {
  const espectaculoSchema = new mongoose.Schema({
    artista: {
      type: String,
      required: true,
      trim: true
    },
    fechaFuncion: {
      type: Date,
      required: true
    },
    horaFuncion: {
      type: String,
      required: true,
      trim: true
    },
    duracion: {
      type: Number,
      required: true
    },
    salaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sala',
      required: true
    },
    tipoSala: {
      type: String,
      enum: ['SalaTeatro', 'Anfiteatro'],
      required: true
    },
    precioEntradaA: {
      type: Number,
      required: function() { return this.tipoSala === 'SalaTeatro'; }
    },
    precioEntradaB: {
      type: Number,
      required: function() { return this.tipoSala === 'SalaTeatro'; }
    },
    precioEntrada: {
      type: Number,
      required: function() { return this.tipoSala === 'Anfiteatro'; }
    },
    tipoShow: {
      type: String,
      required: true
    }
  });
  
  return mongoose.model('Espectaculo', espectaculoSchema);
};