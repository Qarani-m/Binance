import { ref } from "vue";
import api from "@/services/api";
import { useAuth } from "./useAuth";

const positions = ref([]);
const openOrders = ref([]);
const loading = ref(false);

export function useFutures() {
  const { fetchProfile } = useAuth();

  const fetchPositions = async () => {
    try {
      loading.value = true;
      const response = await api.get("/futures/positions");
      positions.value = response.data;
    } catch (error) {
      console.error("Failed to fetch positions:", error);
    } finally {
      loading.value = false;
    }
  };

  const addOrder = async (order) => {
    try {
      loading.value = true;
      const response = await api.post("/futures/orders", order);
      // Refresh positions and balance after a successful order
      await Promise.all([fetchPositions(), fetchProfile()]);
      return response.data;
    } catch (error) {
      console.error("Failed to place order:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const closePosition = async (id) => {
    try {
      loading.value = true;
      // In a simple backend, we just send the ID to close it at current market price
      await api.post("/futures/close-position", { positionId: id });
      await Promise.all([fetchPositions(), fetchProfile()]);
    } catch (error) {
      console.error("Failed to close position:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    positions,
    openOrders,
    loading,
    fetchPositions,
    addOrder,
    closePosition,
  };
}
