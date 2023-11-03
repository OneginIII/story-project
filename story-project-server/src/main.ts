import express from "express";

const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send("Hello world!");
});

server.listen(port, () => {
  console.log("Server running on port " + port);
});
