const request = require('supertest');
const app = require('../../app/config/app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let salaId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  salaId = new mongoose.Types.ObjectId();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Control de horarios y limpieza de espectáculos', () => {
  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('no permite dos espectáculos en la misma sala, fecha y hora', async () => {
    const payload = {
      artista: 'Artista 1',
      fechaFuncion: '2025-07-15',
      horaFuncion: '20:00',
      duracion: 120,
      salaId,
      tipoSala: 'SalaTeatro',
      precioEntradaA: 2000,
      precioEntradaB: 1000,
      tipoShow: 'Obra'
    };
    await request(app).post('/api/espectaculos').send(payload).expect(201);

    // Intentar crear otro igual
    const res = await request(app).post('/api/espectaculos').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/ya existe/i);
  });

  it('no permite espectáculos si no hay al menos una hora libre entre el fin de uno y el inicio del siguiente', async () => {
    // Primer espectáculo
    await request(app).post('/api/espectaculos').send({
      artista: 'Artista 1',
      fechaFuncion: '2025-07-15',
      horaFuncion: '20:00',
      duracion: 120,
      salaId,
      tipoSala: 'SalaTeatro',
      precioEntradaA: 2000,
      precioEntradaB: 1000,
      tipoShow: 'Obra'
    }).expect(201);

    // Segundo espectáculo, empieza 30 minutos después de terminar el anterior
    const res = await request(app).post('/api/espectaculos').send({
      artista: 'Artista 2',
      fechaFuncion: '2025-07-15',
      horaFuncion: '21:30',
      duracion: 60,
      salaId,
      tipoSala: 'SalaTeatro',
      precioEntradaA: 2000,
      precioEntradaB: 1000,
      tipoShow: 'Obra'
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/al menos una hora libre/i);
  });

  it('permite espectáculos con suficiente tiempo de limpieza', async () => {
    // Primer espectáculo
    await request(app).post('/api/espectaculos').send({
      artista: 'Artista 1',
      fechaFuncion: '2025-07-15',
      horaFuncion: '20:00',
      duracion: 60,
      salaId,
      tipoSala: 'SalaTeatro',
      precioEntradaA: 2000,
      precioEntradaB: 1000,
      tipoShow: 'Obra'
    }).expect(201);

    // Segundo espectáculo, empieza 1h 10min después de terminar el anterior
    const res = await request(app).post('/api/espectaculos').send({
      artista: 'Artista 2',
      fechaFuncion: '2025-07-15',
      horaFuncion: '21:10',
      duracion: 60,
      salaId,
      tipoSala: 'SalaTeatro',
      precioEntradaA: 2000,
      precioEntradaB: 1000,
      tipoShow: 'Obra'
    });
    expect(res.status).toBe(201);
  });
});