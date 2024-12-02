import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith('/profile');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      // If on profile page, require authentication
      if (isOnProfile) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      // If logged in and on login page, redirect to home
      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/', nextUrl));
      }

      // Allow all other routes
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;