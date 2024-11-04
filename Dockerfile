# Menggunakan image dasar PHP yang mendukung aplikasi Laravel
FROM php:8.2-cli

# Install dependensi yang dibutuhkan
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Install Composer versi terbaru
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www

# Salin semua file proyek Laravel ke dalam container
COPY . .

# Pindah ke direktori mahasiswa
WORKDIR /var/www/mahasiswa

# Salin .env.example menjadi .env
RUN cp .env.example .env

# Install dependensi Laravel
RUN composer install --no-interaction --prefer-dist

# Set permissions untuk storage dan bootstrap cache
RUN chown -R www-data:www-data /var/www/mahasiswa/storage /var/www/mahasiswa/bootstrap/cache \
    && chmod -R 775 /var/www/mahasiswa/storage /var/www/mahasiswa/bootstrap/cache

# Expose port 8000 (port default dari php artisan serve)
EXPOSE 8000

# Generate aplikasi key
RUN php artisan key:generate

# Jalankan migrasi database
# RUN php artisan migrate

# Jalankan Laravel menggunakan server built-in dengan php artisan serve
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
