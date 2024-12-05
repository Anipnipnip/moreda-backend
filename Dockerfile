# Gunakan image resmi Node.js dari Docker Hub sebagai base image
FROM node:18-alpine

# Set working directory di dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies aplikasi
RUN npm install

# Salin seluruh kode sumber aplikasi ke dalam container
COPY . .

# Expose port yang digunakan aplikasi, default untuk aplikasi Node.js adalah 8080
EXPOSE 8080

# Perintah untuk menjalankan aplikasi
CMD [ "npm", "start" ]
