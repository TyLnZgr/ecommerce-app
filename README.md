# Ecommerce App

A **Ecommerce Web Application** built with modern web technologies.  
This project demonstrates a high-performance, secure online shopping platform and serves as an excellent portfolio reference.

---

## 🔹 Technologies

- **Frontend:** Next.js v15, React v19, TypeScript, Tailwind CSS, ShadCN UI
- **Backend & API:** Next.js API Routes, Prisma, PostgreSQL
- **Form & Validation:** React Hook Form, Zod
- **Authentication:** Next Auth
- **File Uploads:** Uploadthing
- **Linting & Code Quality:** ESLint
- **Data Visualization:** Recharts

---

## 🔹 Features

- **User Management:** Registration, login, and profile management
- **Product Management:** Listing, detailed view, and category filtering
- **Cart & Checkout:** User cart with secure payment via Credit Card and Cash
- **Admin Panel:** Add, edit, delete products, and track orders
- **Form Validation:** Strong client-side and server-side validation (React Hook Form + Zod)
- **File Uploads:** Secure and fast product image uploads
- **Analytics & Charts:** Sales and user statistics with Recharts
- **Responsive Design:** Fully mobile-friendly layout
- **Code Quality & Testing:** ESLint for code standards, Jest for unit tests

  ```

  ```

  ## 🔹 Getting Started (Local Setup)

Follow these steps to run the project locally 👇

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/TylnZgr/ecommerce-app.git
cd ecommerce-app

npm install
# or
pnpm install
# or
yarn install

# ---------- Public App Info ----------
# ---------- App Info ----------
NEXT_PUBLIC_APP_NAME="E-commerce App"
NEXT_PUBLIC_APP_DESC="A Modern ecommerce platform built with Next.js"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

# ---------- Database ----------
# Replace with your own PostgreSQL connection string
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>/<DB_NAME>?sslmode=require"

# ---------- Authentication ----------
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"

# ---------- Google OAuth ----------
# You can create credentials from Google Cloud Console:
# https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

Setup the Database
npx prisma migrate dev
npx prisma studio

Start the Development Server

npm run dev

Then visit:

👉 http://localhost:3000

Build for Production

npm run build
npm start
```
