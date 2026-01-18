import { ref } from "vue";

// Helper to generate a random Guest ID
const getGuestId = () => {
  let id = localStorage.getItem("chat_guest_id");
  if (!id) {
    id = `guest_${Math.floor(Math.random() * 1000000)}`;
    localStorage.setItem("chat_guest_id", id);
  }
  return id;
};

class ChatService {
  constructor() {
    this.socket = null;
    this.messages = ref([]);
    this.isConnected = ref(false);
    this.isTyping = ref(false);
    this.userId = null;
    this.isAnonymous = false;

    // Set to TRUE to basic mock testing, FALSE to use real backend
    this.useMock = false;
  }

  connect(user = null) {
    if (this.isConnected.value) return;

    // 1. Determine User Identity
    if (user && user.id) {
      this.userId = user.id;
      this.isAnonymous = false;
    } else {
      this.userId = getGuestId();
      this.isAnonymous = true;
    }

    console.log(
      `ChatService: Connecting as ${this.userId} (Anonymous: ${this.isAnonymous})`
    );

    if (this.useMock) {
      this.connectMock();
    } else {
      this.connectReal();
    }
  }

  connectReal() {
    // REAL BACKEND CONNECTION
    // The backend uses this ID to track constraints (5s delay, conversation history)
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = "https://crypto-exchange-bc-latest-1.onrender.com"; // Change this to your actual backend port/host
    this.socket = new WebSocket(
      `${protocol}://${host}/ws/chat?userId=${this.userId}&isAnonymous=${this.isAnonymous}`
    );

    this.socket.onopen = () => {
      this.isConnected.value = true;
      console.log("ChatService: WebSocket Connected");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleIncomingMessage(data);
    };

    this.socket.onclose = () => {
      this.isConnected.value = false;
      console.log("ChatService: WebSocket Disconnected");
    };

    this.socket.onerror = (error) => {
      console.error("ChatService: WS Error", error);
    };
  }

  connectMock() {
    this.isConnected.value = true;
    console.log("ChatService: Connected (Mock Mode)");
    // Simulate welcome message
    setTimeout(() => {
      this.handleIncomingMessage({
        type: "system",
        text: "Hi there! 👋 Welcome to Binance Support. How can we help you today?",
        options: [
          { label: "Deposit Issue", value: "deposit_issue" },
          { label: "Withdrawal Pending", value: "withdrawal_pending" },
          { label: "Talk to Agent", value: "agent" },
        ],
      });
    }, 500);
  }

  disconnect() {
    this.isConnected.value = false;
    this.messages.value = [];
    if (this.socket) {
      this.socket.close();
    }
  }

  sendMessage(text) {
    // 1. Add user message locally immediately for UI responsiveness
    this.addUserMessage(text);

    if (this.useMock) {
      this.simulateBotResponse(text);
    } else if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // 2. Send to Backend
      // The Backend will hold this for 5s. If Admin replies, we get Admin msg.
      // If not, Backend invokes ChatGPT and sends us that reply.
      this.socket.send(
        JSON.stringify({
          type: "message",
          content: text,
          userId: this.userId,
          isAnonymous: this.isAnonymous,
        })
      );
    }
  }

  handleIncomingMessage(data) {
    // Handle different message types (System/Bot vs Admin Human)
    // The frontend treats them mostly the same visually
    this.addSystemMessage({
      id: data.id || Date.now(),
      text: data.text || data.content,
      options: data.options,
      sender: data.sender || "system", // 'system' or 'agent'
    });
  }

  // --- Helpers ---

  addUserMessage(text) {
    this.messages.value.push({
      id: Date.now(),
      sender: "user",
      text: text,
      timestamp: new Date(),
    });
  }

  addSystemMessage(msg) {
    this.messages.value.push({
      id: msg.id || Date.now(),
      sender: msg.sender || "system",
      text: msg.text,
      options: msg.options || null,
      timestamp: new Date(),
    });
  }

  simulateBotResponse(userText) {
    this.isTyping.value = true;

    setTimeout(() => {
      this.isTyping.value = false;

      // ... (Existing simulated logic kept for testing) ...
      let responseText =
        "Available Agents are offline. (Simulated AI response)";
      let options = null;

      const lowerText = userText.toLowerCase();

      if (lowerText.includes("deposit")) {
        responseText =
          "I can help with deposits. Is this regarding a crypto deposit or fiat currency?";
        options = [
          { label: "Crypto Deposit", value: "crypto_dep" },
          { label: "Fiat (Cash)", value: "fiat_dep" },
        ];
      } else if (lowerText.includes("agent")) {
        responseText =
          "I'm connecting you to a human agent. Current wait time is approximately 2 minutes.";
      }

      this.addSystemMessage({
        text: responseText,
        options: options,
      });
    }, 1500);
  }
}

export const chatService = new ChatService();
