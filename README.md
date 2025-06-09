# 🎭 Proyecto: Sistema de Venta de Entradas para Obras de Teatro

## 📌 Descripción General
Un sistema integral para la gestión y venta de entradas para espectáculos teatrales, optimizando la administración de salas y eventos.

## 🏗️ Arquitectura del Sistema

### 🗂️ Modelo de Datos
Usuario
{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "telefono": String,
  "createdAt: Date
}

Sala
{
  "_id": ObjectId,
  "tipoSala": "SalaTeatro" | "Anfiteatro",
  "capacidad": Number,
  "precioBaseB": Number, // Solo si tipoSala = SalaTeatro
  "precioFijo": Number   // Solo si tipoSala = Anfiteatro
}

Espectaculo
{
  "_id": ObjectId,
  "artista": String,
  "fechaFuncion": Date,
  "horaFuncion": String,
  "duracion": Number,
  "salaId": ObjectId,
  "precioEntradaA": Number,
  "precioEntradB": Number,
  "precioEntrada": Number,
  "tipoShow": String
}

Entrada
{
  "_id": ObjectId,
  "espectaculoId": ObjectId,
  "fechaCompra": Date,
  "cantidad": Number
}

compraEntrada
{
  "_id": ObjectId,
  "entradaId": ObjectId,
  "userId": ObjectId,
  "cantidadEntradas": Number,
  "precioFinal": Number,
  "tipoEntrada": "A" | "B"
}

### 👨🏻‍💻 Tipo de testing:
Tipos de Testeo Planificados
-Test Unitarios: Se desarrollarán tests unitarios para las clases principales del backend, verificando la correcta funcionalidad aislada de métodos críticos, como el control de horarios de espectáculos y la gestión de entradas.

-Test de Integración: Se planifican pruebas de integración para validar la correcta comunicación entre:

Backend y la Base de Datos (MongoDB).

#### ℹ️Módulos a testear:
-Control de Horarios: Validación de superposición de espectáculos y respeto del tiempo mínimo de limpieza entre funciones.

-Módulo de Gestión de Espectáculos: Alta, modificación, consulta y baja de espectáculos.

### ⚠️ Consideraciones:
En el modelado de datos:

Se define una colección Sala única para ambas subclases, diferenciando el tipo de sala mediante el campo tipoSala.
Esta decisión se justifica para facilitar el mantenimiento, mejorar las consultas y permitir una rápida incorporación de nuevos tipos de salas en el futuro.

Se utilizará el siguiente stack tecnológico:

### 🧠 Backend
- **Node.js con Express**: Framework ligero para APIs RESTful.
- **Mongoose**: ORM para modelado de datos con MongoDB.

### 🗃️ Base de Datos
- **MongoDB**: Base de datos NoSQL, ideal para estructuras dinámicas.

### 🧰 Herramientas de Desarrollo
- **Git + GitHub**: Control de versiones.

## 💡 Justificación Tecnológica
Las teconologías seleccionadas son con las que me siento más cómodo a la hora de programar. Además ofrecen:

### ✅ Ventajas de la Arquitectura Seleccionada:
- **Escalabilidad**: MongoDB permite crecer sin fricción con nuevas funcionalidades.
- **Agilidad**: Node.js y Mongoose simplifican la lógica del backend.
