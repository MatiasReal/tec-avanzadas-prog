# Usa la última versión estable de Node
FROM node:current

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto que usa tu servidor (ajústalo si es otro)
EXPOSE 5000

# Comando para arrancar el servidor
CMD ["node", "server.js"]
