module.exports = ({ mongoose }) => {
  const salaSchema = new mongoose.Schema({
    tipoSala: {
      type: String,
      enum: ["SalaTeatro", "Anfiteatro"],
      required: true,
      trim: true,
    },
    capacidad: {
      type: Number,
      required: true
    },
    precioBaseB: {
      type: Number,
      required: function () { return this.tipoSala === "SalaTeatro"; }
    },
    precioFijo: {
      type: Number,
      required: function () { return this.tipoSala === "Anfiteatro"; }
    }
  });

  return mongoose.model('Sala', salaSchema);
};