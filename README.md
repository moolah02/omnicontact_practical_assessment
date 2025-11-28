Omnicontact Practical AssessmentFull-stack Laravel + React app for managing users.(

(Disclaimer: Kinda rushed this, was running behind on time!)

Features- Backend (Laravel): CRUD API for users, MySQL DB, validation, JSON responses, age filter.
- Frontend (React): List users (5/page), search name/email, modal for details, delete users. Tailwind CSS for responsiveness.

Setup (do these)1. Install stuff:

bash
composer install
npm install

2. Env setup: copy .env.example, gen key, edit DB creds.

bash
cp .env.example .env
php artisan key:generate
# edit .env for DB

3. Migrate, build, serve:

bash
php artisan migrate
npm run build
php artisan serve


API Endpoints (quick list)- POST /api/adduser - add user
- GET /api/users - all users
- GET /api/users/{id} - one user
- PUT /api/users/{id} - update
- DELETE /api/users/{id} - delete
- GET /api/users/filter/age?min_age=X&max_age=Y - age filter


