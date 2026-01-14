import { useStorage } from "@vueuse/core";

const isLoggedIn = useStorage("auth_logged_in", false);
const user = useStorage("auth_user", null);

export function useAuth() {
  const login = (email) => {
    isLoggedIn.value = true;
    user.value = {
      email,
      name: email.split("@")[0],
      id: Math.random().toString(36).substr(2, 9),
    };
  };

  const logout = () => {
    isLoggedIn.value = false;
    user.value = null;
  };

  return {
    isLoggedIn,
    user,
    login,
    logout,
  };
}
