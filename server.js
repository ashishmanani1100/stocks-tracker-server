import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import stocksRoutes from "./routes/stocksRoutes.js";
// import manageStudentsRoute from "./routes/manageStudentsRoutes.js";
import cors from "cors";
import connectDB from "./database/db.js";
import { io } from "./util/socket.js";
import "./util/finnhub.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const server = express();
const httpServer = createServer(server);

const PORT = process.env.PORT;

server.use(express.json());

// Allow requests from frontend (localhost:3000)
server.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Stocks Routes
server.use("/api/stocks", stocksRoutes)

// Global Error Handling Middleware (Must be last)
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Bind io to http server
io.attach(httpServer);

// Connect to database
await connectDB();

// Server is running and listening on defined PORT
httpServer.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
