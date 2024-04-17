export const authConfig = {
    providers: [],
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.endsWith("dashboard");
        const isOnLogin = nextUrl.pathname.endsWith("login");
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return Response.redirect(new URL("/login", nextUrl));
        } else if (isOnLogin) {
          if (isLoggedIn)
            return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      },
    },
  };
  