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
  "precioEntradaB": Number,
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

-Test de Integración: Se planifican pruebas de integración para validar la correcta comunicación entre:

Backend y la Base de Datos (MongoDB).

Justificación:
En este proyecto, la lógica de negocio relevante (como el control de horarios y la gestión de espectáculos) depende directamente de la interacción con la base de datos y de la API REST. Por ello, se priorizó el desarrollo de tests de integración que validan el comportamiento real del sistema, incluyendo la comunicación entre el backend y MongoDB, y la correcta gestión de los flujos completos de alta, modificación, consulta y baja de espectáculos.

Esta estrategia asegura que se testean los casos de uso críticos en un entorno lo más cercano posible al real, garantizando la robustez del sistema ante cambios en la base de datos o en la API.

Los tests unitarios no se consideraron estrictamente necesarios, ya que la lógica de negocio no está desacoplada en funciones puras, sino que reside en los controladores y depende de operaciones asíncronas y consultas a la base de datos.

Si en el futuro se extraen funciones puras de validación, se podrán agregar tests unitarios específicos para ellas.

#### ℹ️Módulos a testear:
-Control de Horarios: Validación de superposición de espectáculos y respeto del tiempo mínimo de limpieza entre funciones (mediante tests de integración).

-Módulo de Gestión de Espectáculos: Alta, modificación, consulta y baja de espectáculos (mediante tests de integración).

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

 **Instrucciones para el despliegue:**

  1. Clona el repositorio:
     ```sh
     git clone https://github.com/MatiasReal/tec-avanzadas-prog.git
     cd tec-avanzadas-prog
     ```

  2. Construye y ejecuta el proyecto con Docker:
     ```sh
     docker build -t tec-avanzadas-prog .
     docker run -p 5000:5000 tec-avanzadas-prog
     ```

  3. El backend estará disponible en [http://localhost:5000](http://localhost:5000)
