import admin from "../firebaseAdmin.js";

export async function validateToken(token) {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    throw new Error("Unauthorized");
  }
}

export async function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const user = await validateToken(token);
    req.email = user?.firebase?.identities?.email?.[0];
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
}
