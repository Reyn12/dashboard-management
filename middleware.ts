import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil token dari cookies
  const token = request.cookies.get('auth_token')?.value;
  
  // Cek path yang diakses
  const { pathname } = request.nextUrl;
  
  // Jika mengakses halaman admin dashboard
  if (pathname.startsWith('/admin/dashboard')) {
    // Jika tidak ada token, redirect ke login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Jika mengakses halaman login tapi sudah punya token
  if (pathname === '/admin/login' && token) {
    // Redirect ke dashboard
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Konfigurasi path mana saja yang akan diproses middleware
export const config = {
  matcher: ['/admin/:path*']
};