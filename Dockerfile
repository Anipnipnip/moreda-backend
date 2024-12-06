# Gunakan base image Node.js versi terbaru (LTS)
FROM node:18

# Set work directory di dalam container
WORKDIR /usr/app

# Copy file package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file dari folder proyek ke dalam container
COPY . .

# Jalankan aplikasi
CMD ["npm", "start"]
