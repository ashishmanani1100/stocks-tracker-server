import WebSocket from "ws";
import dotenv from "dotenv";
import { io } from "./socket.js";
import User from "../database/user.model.js";
import { sendEmail } from "./emailServices.js";

dotenv.config();

const socket = new WebSocket(process.env.FINNHUB_URL);

// Connection opened -> Subscribe
socket.addEventListener("open", function (event) {
  socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
  socket.send(JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" }));
  socket.send(JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" }));
});

socket.addEventListener("message", async function (event) {
  const parsedData = JSON.parse(event.data);

  if (parsedData) {
    const result = {
      type: parsedData?.type,
      data: parsedData?.data?.[parsedData.data.length - 1],
    };

    const stock = result?.data?.s;
    const price = result?.data?.p;
    console.log(stock, price);

    const users = await User.find({ "stockAlertValue.stock": stock });

    users.map(async (user) => {
      const maxPriceForStock = user.stockAlertValue.find(
        (stockMaxValue) => stockMaxValue.stock === stock
      );
      if (price > maxPriceForStock?.price) {
        console.log("email moklo", user.email);
        await sendEmail(user.email, "Stock value increase alert", `Value for ${stock} increased to ${price}`);
      }
    });

    io.emit("notification", result);
  }
});

var unsubscribe = function (symbol) {
  socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
};
