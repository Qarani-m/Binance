import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";
import api from "../services/api";
import { io } from "socket.io-client";

const token = useStorage("auth_token", null);
const user = useStorage("auth_user", null);
const socket = ref(null);

export function useAuth() {
  const isLoggedIn = computed(() => !!token.value);

  const initSocket = (userId) => {
    if (socket.value) return;

    socket.value = io("http://localhost:3000");

    socket.value.on("connect", () => {
      if (!userId) {
        console.warn("Socket connected but no userId provided for join");
        return;
      }
      console.log("Connected to socket");
      socket.value.emit("join", userId);
    });

    socket.value.on("deposit_update", (deposit) => {
      console.log("Deposit update received:", deposit);
      fetchProfile().catch(() => {});
    });

    socket.value.on("disconnect", () => {
      console.log("Disconnected from socket");
    });
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email: email.toLowerCase(),
        password,
      });

      const { token: jwt, userId } = response.data;
      token.value = jwt;

      // Fetch user profile after login
      await fetchProfile();

      if (user.value) {
        initSocket(user.value.id);
      }

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await api.post("/auth/register", {
        email: email.toLowerCase(),
        password,
      });

      const { token: jwt, userId } = response.data;
      token.value = jwt;

      await fetchProfile();

      if (user.value) {
        initSocket(user.value.id);
      }

      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      user.value = response.data;
      return response.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      if (error.response?.status === 401) {
        logout();
      }
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };

  // Auto-init socket if already logged in
  if (isLoggedIn.value && user.value?.id && !socket.value) {
    initSocket(user.value.id);
  }

  return {
    isLoggedIn,
    user,
    token,
    login,
    register,
    logout,
    fetchProfile,
  };
}
