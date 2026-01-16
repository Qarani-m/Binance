import { ref } from "vue";

const notifications = ref([]);

export function useNotification() {
  const showNotification = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'info', 'warning'
    };

    notifications.value.push(notification);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  return {
    notifications,
    showNotification,
    removeNotification,
  };
}
