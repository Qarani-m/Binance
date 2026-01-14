import { ref, onMounted, onUnmounted } from "vue";

export function useBinanceData(symbol = "BTCUSDT") {
  const ticker = ref({
    price: 0,
    change: 0,
    high: 0,
    low: 0,
    vol: 0,
    volQuote: 0,
    markPrice: 0,
    indexPrice: 0,
  });
  const orderBook = ref({ asks: [], bids: [] });
  const recentTrades = ref([]);
  const currentPrice = ref(0);

  let ws = null;
  let shouldReconnect = true;

  const connect = () => {
    const s = symbol.toLowerCase();
    const streams = [`${s}@ticker`, `${s}@depth20@100ms`, `${s}@aggTrade`].join(
      "/"
    );

    ws = new WebSocket(`wss://fstream.binance.com/stream?streams=${streams}`);

    ws.onopen = () => {
      console.log(`[BinanceWS] Connected to ${symbol}`);
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const stream = msg.stream;
      const data = msg.data;

      if (stream.includes("@ticker")) {
        ticker.value = {
          price: parseFloat(data.c),
          change: parseFloat(data.P),
          high: parseFloat(data.h),
          low: parseFloat(data.l),
          vol: parseFloat(data.v),
          volQuote: parseFloat(data.q),
          // Specific fields for Coin-M/Futures differentiation might need adjustment
          markPrice: parseFloat(data.c), // approx
          indexPrice: parseFloat(data.c), // approx
        };
      } else if (stream.includes("@depth")) {
        orderBook.value = {
          asks: data.a.map((x) => ({
            price: parseFloat(x[0]),
            size: parseFloat(x[1]),
          })),
          bids: data.b.map((x) => ({
            price: parseFloat(x[0]),
            size: parseFloat(x[1]),
          })),
        };
      } else if (stream.includes("@aggTrade")) {
        const price = parseFloat(data.p);
        currentPrice.value = price;
        // We could append to recentTrades here if needed
      }
    };

    ws.onclose = () => {
      console.log(`[BinanceWS] Disconnected`);
      if (shouldReconnect) {
        setTimeout(connect, 3000);
      }
    };
  };

  const close = () => {
    shouldReconnect = false;
    if (ws) ws.close();
  };

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    close();
  });

  return {
    ticker,
    orderBook,
    currentPrice,
  };
}
