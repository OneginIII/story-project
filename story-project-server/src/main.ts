import express from "express";
import cors from "cors";
import { publicRouter } from "./publicRoutes";
import "dotenv/config";
import { privateRouter } from "./privateRoutes";
import { authenticateAdmin } from "./auth";

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use(publicRouter);
server.use("/admin/", authenticateAdmin, privateRouter);
server.use("/public", express.static("public"));

server.listen(port, () => {
  console.log("Server running on port " + port);
});
