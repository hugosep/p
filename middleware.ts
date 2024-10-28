import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export { auth as middleware } from '@/lib/auth';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ]
};
