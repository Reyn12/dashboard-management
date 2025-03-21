// app/services/api.ts
const BASE_URL = "https://dummyjson.com";

// Definisi tipe data
export interface Product {
  category: string;
  id: number;
  title: string;
  price: number;
  // tambahkan properti lain sesuai kebutuhan
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  // tambahkan properti lain sesuai kebutuhan
}

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

interface CartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products?limit=0`);
  return response.json();
}

export async function fetchUsers(): Promise<UsersResponse> {
  const response = await fetch(`${BASE_URL}/users?limit=0`);
  return response.json();
}

export async function fetchCarts(): Promise<CartsResponse> {
  const response = await fetch(`${BASE_URL}/carts?limit=0`);
  return response.json();
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  return response.json();
}

// Fungsi untuk menghitung total revenue dari semua cart
export async function calculateTotalRevenue(): Promise<number> {
  const response = await fetch(`${BASE_URL}/carts?limit=0`);
  const data: CartsResponse = await response.json();
  
  return data.carts.reduce((total: number, cart: Cart) => {
    return total + cart.total;
  }, 0);
}