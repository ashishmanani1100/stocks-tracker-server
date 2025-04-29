import User from "../database/user.model.js";

const addUser = async (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).send("Email is required");

  const existsUser = await User.findOne({ email });
  if (!existsUser) {
    await User.create({ email });
  }
  return res.send(existsUser);
};

const updateUsertStockAlert = async (req, res) => {
  const { stock, price } = req.body;
  const email = req.email;

  if (!stock || !price) return res.status(400).send("Stock and price required");

  const existsUser = await User.findOne({ email });
  if (!existsUser) return res.status(200).send("Invalid user");

  const stockAlertValue = existsUser.stockAlertValue;
  
  const stockExists = stockAlertValue.find(
    (stockMaxValue) => stockMaxValue.stock === stock
  );

  if (stockExists) {
    existsUser.stockAlertValue = stockAlertValue.map((stockMaxValue) => {
      if (stockMaxValue.stock === stock) {
        return {
          stock,
          price,
        };
      }

      return stockMaxValue;
    });
  } else {
    existsUser.stockAlertValue.push({ stock, price });
  }

  await existsUser.save();
  return res.send(existsUser);
};

const userStockAlert = async (req, res) => {
  const email = req.email;
  const { stock } = req.params;

  if (!stock) return res.status(400).send("stock is required")

  const existsUser = await User.findOne({ email });
  return res.send(existsUser?.stockAlertValue?.find((stockMaxValue) => stockMaxValue.stock === stock))
};

export { addUser, updateUsertStockAlert, userStockAlert };
