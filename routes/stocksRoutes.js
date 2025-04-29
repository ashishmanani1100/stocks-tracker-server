import express from "express";
import {
  addUser,
  updateUsertStockAlert,
  userStockAlert
} from "../controllers/userController.js";
import { sendStockEmail } from "../controllers/stocksAlert.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-user", addUser);
router.post("/update-stock-alert", authenticateUser, updateUsertStockAlert);
router.get("/user-stock-alert/:stock", authenticateUser , userStockAlert);
router.post("/stocks-alert", sendStockEmail);

export default router;
