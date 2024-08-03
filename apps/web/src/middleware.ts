import { authMiddleware } from "./auth/middleware/authMiddleware";

export const middleware = authMiddleware({
  ignoredRoutes: ["/api/(.*)", "/auth/(.*)", "/sale/client/code/(.*)"],
  // debug: true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(trpc)(.*)"],
};
