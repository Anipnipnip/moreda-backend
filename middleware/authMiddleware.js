import jwt from "jsonwebtoken";
import { invalidatedTokens } from "./authController.js";

const authenticateToken = (req, res, next) => {
  const headerAuth = req.headers["authorization"];
  const token = headerAuth && headerAuth.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (invalidatedTokens.has(token)) {
      return res.status(401).json({ message: "Unauthorized: Token invalidated" });
    }

    req.authData = decodedToken;
    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export { authenticateToken };
