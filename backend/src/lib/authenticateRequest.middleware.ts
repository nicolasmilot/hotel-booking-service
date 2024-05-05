import { NextFunction, Request, Response } from "express";

export const AuthenticateRequest = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token;

    if (!token) return res.status(401).send("UNAUTHORIZED");

    // Validation logic
    const isValid = token === "26";

    if (!isValid) return res.status(401).send("UNAUTHORIZED");

    next();
  }
}