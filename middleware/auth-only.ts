import { useUserStore } from "~/store/user";
import { userService } from "~/components/api/UserService";

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore();

  // localStorage token check (client only)
  const token = import.meta.client ? localStorage.getItem("_token") : null;
  if (!token) return navigateTo("/login", { replace: true });

  // If store already has user, allow
  let user = userStore.getUser;
  if (user) return;

  // Hydrate user from backend
  try {
    const res = await userService.me();
    user = (res as any)?.data ?? res;

    if (!user) throw new Error("ME returned empty user");

    // store
    userStore.setUser(user);
    return;
  } catch (e) {
    userStore.resetUser();
    if (import.meta.client) localStorage.removeItem("_token");
    return navigateTo("/login", { replace: true });
  }
});
