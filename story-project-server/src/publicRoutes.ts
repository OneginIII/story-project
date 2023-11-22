import express from "express";
import fs from "fs";
import "dotenv/config";
import dao from "./dao";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

const router = express.Router();
const staticPagesPath = String(process.env.STATIC_PAGE_LOCATION);
const SECRET = process.env.SECRET as jwt.Secret;

// Default

router.get("/", (req, res) => {
  res.send("Story Project Server");
});

// Stories

// GET
router.get("/stories", async (req, res) => {
  const result = await dao.getStories();
  res.send(result.rows);
});

router.get("/story/:id", async (req, res) => {
  const result = await dao.getStory(req.params.id);
  res.send(result.rows[0]);
});

router.get("/chapters/:story_id", async (req, res) => {
  const result = await dao.getChapters(req.params.story_id);
  res.send(result.rows);
});

// Static pages

router.get("/pages", (req, res) => {
  fs.readdir(staticPagesPath, { withFileTypes: false }, (err, files) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(files);
  });
});

router.get("/page/:name", (req, res) => {
  if (typeof req.params.name === "string") {
    fs.readFile(`${staticPagesPath}${req.params.name}.md`, (err, data) => {
      if (err) {
        res.send(err);
        return;
      }
      res.send(data.toString());
    });
  } else res.status(500).send();
});

// Authenticate

router.post("/login", async (req, res) => {
  if (req.body.username.length > 0 && req.body.password.length > 0) {
    const result = await dao.getUser(req.body.username);
    if (result.rowCount) {
      const user = result.rows[0];
      const verify = await argon2.verify(user.password, req.body.password);
      if (verify) {
        const token = jwt.sign({ username: user.username }, SECRET, {
          expiresIn: "1d",
        });
        res.status(200).send(token);
      } else {
        res.status(401).send("Unauthorized");
      }
    } else {
      res.status(404).send("User not found");
    }
  } else {
    res.status(400).send("Empty username or password");
  }
});

router.post("/register", async (req, res) => {
  if (req.body.username.length > 0 && req.body.password.length > 0) {
    const newUser = {
      username: req.body.username,
      password: await argon2.hash(req.body.password),
    };
    await dao.createUser(newUser.username, newUser.password);
    res.status(200).send("Register complete");
  } else {
    res.status(400).send("Empty username or password");
  }
});

router.post("/verify", async (req, res) => {
  const auth = req.body.token;
  if (typeof auth !== "string") {
    return res.status(401).send("Invalid token");
  }
  const token = auth;
  const secret = process.env.SECRET as jwt.Secret;
  try {
    jwt.verify(token, secret);
    return res.status(200).send();
  } catch (err) {
    return res.status(403).send("Unauthorized");
  }
});

export { router as publicRouter };
