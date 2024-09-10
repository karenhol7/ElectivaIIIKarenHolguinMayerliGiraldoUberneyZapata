# Usa la imagen oficial de Node.js
FROM node:latest

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package.json yarn.lock ./

# Instala las dependencias usando Yarn
RUN yarn install

# Copia todo el código
COPY . .

# Construye la aplicación de React para producción
RUN yarn build

# Instala un servidor para servir archivos estáticos
RUN yarn global add serve

# Expone el puerto que usará el contenedor
EXPOSE 9000

# Usa "serve" para servir la aplicación en producción
CMD ["serve", "-s", "dist"]
