# NOVA — Full-Stack E-Commerce App

A complete e-commerce application built with **Next.js 14** (frontend) and **Spring Boot** (backend).

---

## Project Structure

```
ClothingWebsite/
├── src/                   # Next.js frontend (App Router)
│   └── app/
│       ├── components/    # Header, ProductCard, Cart, Filter …
│       ├── context/       # ShopContext (cart, wishlist, auth)
│       ├── lib/           # API client (api.ts)
│       ├── product/[id]/  # Product detail page
│       ├── shop/          # Shop / listing page
│       ├── checkout/      # Multi-payment checkout
│       ├── orders/        # Order history + detail
│       ├── wishlist/      # Wishlist page
│       ├── login/         # Login page
│       └── register/      # Register page
├── backend/               # Spring Boot REST API
│   └── src/main/java/com/demo/ecommerce/
│       ├── controller/    # REST endpoints
│       ├── service/       # Business logic
│       ├── model/         # JPA entities
│       ├── repository/    # Spring Data repos
│       ├── security/      # JWT auth filter
│       └── config/        # Security, CORS, DataSeeder
├── public/
├── package.json
└── tailwind.config.ts
```

---

## Tech Stack

| Layer     | Technology                                              |
|-----------|---------------------------------------------------------|
| Frontend  | Next.js 14, TypeScript, Tailwind CSS, Framer Motion     |
| Backend   | Spring Boot 4, Spring Security 7, JWT                   |
| Database  | MySQL 8                                                 |
| Auth      | JWT (stateless)                                         |

---

## Features

- User authentication (register / login / JWT)
- Product listing with filters, search and sort
- Product detail page with size and colour selector
- Shopping cart (server-side, per user)
- Wishlist (persisted to backend when logged in)
- Checkout with UPI / Card / Net Banking / COD / Wallet
- Unique order codes (`ORD-YYYYMM-XXXXXX`)
- Order history and order detail pages
- 110 seeded products across 5 categories with sizes and colours

---

## Getting Started

### Backend
```bash
cd backend
./mvnw spring-boot:run
# Runs on http://localhost:8081
```

Update `backend/src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=yourpassword
```

### Frontend
```bash
npm install
npm run dev
# Runs on http://localhost:3000
```
