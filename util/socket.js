import { Server } from "socket.io";
import { validateToken } from "../middlewares/authMiddleware.js";

const io = new Server({ cors: "http://localhost:3000" });

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const user = await validateToken(token);
    socket.userEmail = user.firebase.identities.email[0];

    next();
  } catch (error) {
    next(error);
  }
});

export { io };
