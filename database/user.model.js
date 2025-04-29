import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  stockAlertValue: [{ stock: String, price: Number }],
});

const User = mongoose.model("User", userSchema);

export default User;
