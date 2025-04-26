# 🎭 Proyecto: Sistema de Venta de Entradas para Obras de Teatro

## 📌 Descripción General
Un sistema integral para la gestión y venta de entradas para espectáculos teatrales, optimizando la experiencia del usuario y la administración de salas y eventos.

## 🏗️ Arquitectura del Sistema

### 📘 Diagrama de Clases

![umlTeatro](https://github.com/user-attachments/assets/d71dc8ef-d09e-4c3b-8604-9252eb950225)

### 👨🏻‍💻 Tipo de testing:
Tipos de Testeo Planificados
-Test Unitarios: Se desarrollarán tests unitarios para las clases principales del backend, verificando la correcta funcionalidad aislada de métodos críticos, como el control de horarios de espectáculos y la gestión de entradas.

-Test de Integración: Se planifican pruebas de integración para validar la correcta comunicación entre:

Frontend (Java Swing) y Backend (API REST en Node.js).

Backend y la Base de Datos (MongoDB).

-Test Manual de Interfaz: Dado que la aplicación de escritorio está desarrollada en Java Swing, se realizará un testeo manual para verificar la usabilidad, la validación de formularios y la experiencia de usuario.

#### ℹ️Módulos a testear:
-Control de Horarios: Validación de superposición de espectáculos y respeto del tiempo mínimo de limpieza entre funciones.

-Módulo de Gestión de Espectáculos: Alta, modificación, consulta y baja de espectáculos.

-Comunicación Frontend-Backend: Asegurar el correcto flujo de datos en las operaciones principales.

### ⚠️ Consideraciones:
Se utilizará el siguiente stack tecnológico:

### 🧠 Backend
- **Node.js con Express**: Framework ligero para APIs RESTful.
- **Mongoose**: ORM para modelado de datos con MongoDB.

### 🗃️ Base de Datos
- **MongoDB**: Base de datos NoSQL, ideal para estructuras dinámicas.

### 🎨 Frontend
- **Java con Swing**: Para la interfaz gráfica de escritorio.

### 🧰 Herramientas de Desarrollo
- **Git + GitHub**: Control de versiones.

## 💡 Justificación Tecnológica
Las teconologías seleccionadas son con las que me siento más cómodo a la hora de programar. Además ofrecen:

### ✅ Ventajas de la Arquitectura Seleccionada:
- **Desacople**: Frontend Java y backend Node pueden evolucionar por separado.
- **Escalabilidad**: MongoDB permite crecer sin fricción con nuevas funcionalidades.
- **Portabilidad**: Aplicación Swing puede ser usada sin necesidad de navegador.
- **Agilidad**: Node.js y Mongoose simplifican la lógica del backend.
