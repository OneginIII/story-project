import express from "express";
import fs from "fs";
import "dotenv/config";
import dao from "./dao";

const router = express.Router();
const staticPagesPath = String(process.env.STATIC_PAGE_LOCATION);

// Stories

router.get("/", (req, res) => {
  res.send("Story Project Server");
});

router.get("/stories", async (req, res) => {
  const result = await dao.getStories();
  res.send(result.rows);
});

router.get("/story/:url", async (req, res) => {
  const result = await dao.getStory(req.params.url);
  res.send(result.rows);
  // const story = stories.find((story) => story.url === req.params.url);
  // res.send(JSON.stringify(story));
});

router.get("/story/:url/:chapter", async (req, res) => {
  const result = await dao.getStoryChapter(
    req.params.url,
    Number(req.params.chapter)
  );
  res.send(result.rows);
  // const story = stories.find((story) => story.url === req.params.url);
  // res.send(
  //   JSON.stringify(
  //     story?.chapters[
  //       Number(req.params.chapter) ? Number(req.params.chapter) : 0
  //     ]
  //   )
  // );
});

router.get("/count/:url/", async (req, res) => {
  const result = await dao.getChapterCount(req.params.url);
  res.send(result.rows[0]["count"]);
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
