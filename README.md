# Omnicontact Practical Assessment

Full-stack Laravel + React application for user management.

## Features

### Backend (Laravel)
- RESTful API for user CRUD operations
- MySQL database integration
- Input validation and error handling
- Consistent JSON response format
- Age-based user filtering

### Frontend (React)
- User listing with pagination (5 users per page)
- Search functionality by name/email
- Modal for detailed user information
- Delete user functionality
- Responsive design with Tailwind CSS

## Setup

1. Install dependencies:
```bash
composer install
npm install
```

2. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

3. Set up database in `.env`:
```
DB_CONNECTION=mysql
DB_DATABASE=omnicontact
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

4. Run migrations:
```bash
php artisan migrate
```

5. Build frontend assets:
```bash
npm run build
```

6. Start the development server:
```bash
php artisan serve
```

## API Endpoints

- `POST /api/adduser` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get a specific user
- `PUT /api/users/{id}` - Update a user
- `DELETE /api/users/{id}` - Delete a user
- `GET /api/users/filter/age?min_age=X&max_age=Y` - Filter users by age

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
