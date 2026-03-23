![Java](https://img.shields.io/badge/Java-21-blue)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-blue)
# 🚀 Portfolio CMS API

Backend de un portafolio autogestionable desarrollado con **Spring Boot + PostgreSQL**.

👉 Permite gestionar proyectos, usuarios y autenticación básica tipo CMS.

---

## 🧠 ¿Qué hace este proyecto?

✔ Crear y gestionar proyectos  
✔ Registrar usuarios  
✔ Login con validación segura (BCrypt)  
✔ Roles básicos (ADMIN / USER)  
✔ API REST estructurada  
✔ Manejo global de errores  

---

## 🛠️ Stack

- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Hibernate
- BCrypt
- Maven

---

## 🏗️ Arquitectura
Controller → Service → Repository → Database

📡 Endpoints principales
🔐 Auth
POST /api/auth/login

👤 Users
POST /api/users
GET /api/users

📁 Projects
POST /api/projects
GET /api/projects
GET /api/projects/{id}
PUT /api/projects/{id}
DELETE /api/projects/{id}

⚡ Ejemplo rápido
Crear usuario
POST /api/users
{
  "email": "admin@test.com",
  "password": "123456",
  "role": "ADMIN"
}

📈 Próximas mejoras
JWT Authentication 🔐
Spring Security
Roles protegidos
Swagger (documentación)
Upload de imágenes