import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não definido no arquivo .env");
}

// interface JwtPayload {
//     userId: number;
// }

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Token não fornecido." });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    // @ts-ignore
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};