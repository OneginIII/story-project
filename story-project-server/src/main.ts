import express from "express";
import { publicRouter } from "./publicRoutes";

const server = express();
const port = 3000;

server.use(express.json());
server.use(publicRouter);

server.get("/", (req, res) => {
  res.send("Hello world!");
});

server.listen(port, () => {
  console.log("Server running on port " + port);
});
