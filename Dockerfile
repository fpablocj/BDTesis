# Base image
FROM node:latest

# Directorio de trabajo dentro del contenedor
WORKDIR /

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

COPY init.sql /docker-entrypoint-initdb.d/

# Expone el puerto en el que se ejecuta la aplicación de Node.js
EXPOSE 3000

# Comando para levantar el servidor de Node.js
CMD ["npm", "start"]

