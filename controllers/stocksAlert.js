import { sendEmail } from "../util/emailServices.js";

// Generate HTML for stock alert
const generateStockEmailHTML = (stockName, currentPrice, targetPrice, direction) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>📈 Stock Alert!</h2>
      <p>The stock <strong>${stockName}</strong> has just <strong>${direction}</strong> your target price.</p>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Current Price:</strong> $${currentPrice}</li>
        <li><strong>Target Price:</strong> $${targetPrice}</li>
      </ul>
      <p style="color: #888;">This is an automated alert from your Stock Tracker App.</p>
    </div>
  `;
};

export const sendStockEmail = async (req, res) => {
  try {
    const { email, stockName, currentPrice, targetPrice, direction } = req.body;

    const htmlContent = generateStockEmailHTML(stockName, currentPrice, targetPrice, direction);

    await sendEmail(
      email,
      `Stock Alert: ${stockName} has ${direction} $${targetPrice}`,
      `Stock ${stockName} is now ${direction} your target price.`,
      htmlContent
    );

    res.status(200).json({ message: "Email sent successfully", data: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
