## Project Overview

17-Homework — це React додаток з аутентифікацією на базі JWT токенів та механізмом рефреш-токенів.

### Основні компоненти:

Аутентифікація (JWT + Refresh)
Login/Logout функціонал через authApi (POST запити)
Автоматичне оновлення токена через refresh endpoint
Mutex для запобігання конкурентним запитам оновлення токена
authCheckLoader — перевірка прав доступу користувача під час навігації

### Управління користувачами

CRUD операції: getUsers, createUser, getUserById, deleteUser
CreateUserModal — модаль форма для додавання нового користувача
RTK Query кеш із invalidatesTags для автоматичного оновлення списку

### Архітектура

Routing: React Router v6 з lazy-loading сторінок через import.meta.glob
API: RTK Query baseApi з автоматичним оновленням токена
State Management: RTK Query (заміст Redux)
UI: Модальні вікна, форми, список користувачів
Стеку

### React + Vite

RTK Query для API
React Router для навігації
async-mutex для синхронізації
