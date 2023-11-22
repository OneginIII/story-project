import express from "express";
import jwt from "jsonwebtoken";

export interface IRequestWithToken extends express.Request {
  username: string;
}

export interface IUser {
  username: string;
}

export const authenticateAdmin = (
  expressReq: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const req = expressReq as IRequestWithToken;
  const auth = req.get("token");
  if (!auth?.startsWith("bearer ")) {
    return res.status(401).send("Invalid token");
  }
  const token = auth.substring(7);
  const secret = process.env.SECRET as jwt.Secret;
  try {
    const decodedToken = jwt.verify(token, secret) as IRequestWithToken;
    req.username = decodedToken.username;
    if (req.username) {
      next();
    } else {
      return res.status(401).send("Requires authentication");
    }
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};
