export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "E-Commerce App";
export const APP_DESC =
  process.env.NEXT_PUBLIC_APP_DESC ||
  "A Modern e-commerce platform build with Nextjs";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "https://localhost:3000";
export const LATEST_PRODUCTS_LIMIT = Number(process.env.PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: "",
  password: "",
};
