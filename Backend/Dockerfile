FROM node:20-bullseye
 
# Instalar las dependencias necesarias para compilar bcrypt
RUN apt-get update && apt-get install -y build-essential python3
 
WORKDIR /app
 
COPY package*.json ./
 
# Instalar las dependencias dentro del contenedor
RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD ["node", "--watch", "app.js"]