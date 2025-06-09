const express = require("express");
const db = require('./app/config/database');    // Conexión DB
const http = require('http');
const app = require('./app/config/app');
const PORT = process.env.PORT || 5000;


http
  .createServer(app)
  .listen(PORT, () => console.log(`Server listening on port ${PORT}`));


module.exports = app;