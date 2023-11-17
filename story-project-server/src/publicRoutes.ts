import express from "express";
import fs from "fs";
import "dotenv/config";
import dao from "./dao";

const router = express.Router();
const staticPagesPath = String(process.env.STATIC_PAGE_LOCATION);

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

export { router as publicRouter };
