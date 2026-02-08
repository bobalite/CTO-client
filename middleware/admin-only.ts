import { useUserStore } from "~/store/user";
import { userService } from "~/components/api/UserService";

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore();

  // Nuxt 3: use import.meta.client to avoid TS squiggles
  const token = import.meta.client ? localStorage.getItem("_token") : null;
  if (!token) return navigateTo("/login");

  let user = userStore.getUser;

  if (!user) {
    try {
      const res = await userService.me();
      // BaseAPIService returns $fetch result directly (not axios), so usually `res` is the payload already
      user = (res as any)?.data ?? res;

      // Only call if your store actually has setUser()
      userStore.setUser(user);
    } catch {
      userStore.resetUser();
      if (import.meta.client) localStorage.removeItem("_token");
      return navigateTo("/login");
    }
  }

  const roleId =
    Number((user as any)?.userRole?.role_id) ||
    Number((user as any)?.user_role?.role_id) ||
    Number((user as any)?.role_id) ||
    0;

  if (roleId !== 1) {
    userStore.resetUser();
    if (import.meta.client) localStorage.removeItem("_token");
    return navigateTo("/login");
  }
});
