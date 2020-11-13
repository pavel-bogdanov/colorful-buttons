## About

Api based Single-page application with interactive buttons with links.

## Technologies

Backend(API) part:

- Laravel 7
- MySQL
- JWT(json web token) authentication with httponly cookie will prevent XSS (scripts cannot access httponly cookies)
- CSRF protection

Fontend part:

- ReactJS
- Bootsrap

## Installation

- Clone the project
- Rename `.env.example` to `.env` and set your database connection and details. Database should be with utf8mb4_unicode_ci collation
- `composer install`
- `php artisan key:generate`
- `php artisan jwt:secret`
- `php artisan migrate:fresh`
- `npm install`
- `npm run dev`
- `php artisan serve`