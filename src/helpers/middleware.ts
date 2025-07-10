import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  userId: string;
}

const authMiddleware = (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) res.status(401).send({ message: "No token provided" });

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) res.status(401).send({ message: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send({ message: "Invalid token" });
    }
  }
};

export default authMiddleware;
