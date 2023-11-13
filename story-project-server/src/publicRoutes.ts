import express from "express";
import { stories } from "./data";

const router = express.Router();

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

export { router as publicRouter };
