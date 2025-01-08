# Use an official PHP image as the base image
FROM php:8.2-fpm

# Install necessary dependencies and PHP extensions
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql

# Set working directory
WORKDIR /var/www

# Copy the Laravel application files to the container
COPY . .

# Install Composer (using the official composer image)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Laravel dependencies
RUN composer install

# Expose the port the app will run on
EXPOSE 9000

# Run the Laravel application
CMD ["php","artisan","serve","--host=0.0.0.0","--port=9000"]
