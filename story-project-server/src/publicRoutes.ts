import express from "express";
import { stories } from "./data";
import fs from "fs";
import "dotenv/config";

const router = express.Router();
const staticPagesPath = String(process.env.STATIC_PAGE_LOCATION);

router.get("/stories", (req, res) => {
  res.send(JSON.stringify(stories));
});

router.get("/story/:url", (req, res) => {
  const story = stories.find((story) => story.url === req.params.url);
  res.send(JSON.stringify(story));
});

router.get("/story/:url/:chapter", (req, res) => {
  const story = stories.find((story) => story.url === req.params.url);
  res.send(
    JSON.stringify(
      story?.chapters[
        Number(req.params.chapter) ? Number(req.params.chapter) : 0
      ]
    )
  );
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