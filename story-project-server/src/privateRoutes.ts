import express from "express";
import "dotenv/config";
import dao from "./dao";
import multer from "multer";
import fs from "fs";
import { isChapter, isStory } from "./data";
import { validate as uuidValidate } from "uuid";

const iconPath = "public/icons";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, iconPath);
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id + ".svg");
  },
});
const upload = multer({ storage: storage });

// Stories private

// PUT
router.put("/story/:id", async (req, res) => {
  if (isStory(req.body) && uuidValidate(req.params.id)) {
    const result = await dao.updateStory(
      req.params.id,
      req.body.title,
      req.body.icon,
      req.body.url,
      req.body.visible
    );
    res.send(result);
  } else res.status(400).send();
});

router.put("/chapters/:id", async (req, res) => {
  if (isChapter(req.body) && uuidValidate(req.params.id)) {
    const result = await dao.updateChapter(
      req.params.id,
      req.body.title,
      req.body.text,
      req.body.number
    );
    res.send(result);
  } else res.status(400).send();
});

// POST
router.post("/story", async (req, res) => {
  if (isStory(req.body)) {
    const result = await dao.createStory(
      req.body.id,
      req.body.title,
      req.body.icon,
      req.body.url,
      req.body.visible
    );
    res.send(result);
  } else res.status(400).send();
});

router.post("/story/:id/icon", upload.single("icon"), async (req, res) => {
  if (req.file) {
    res.send(`${req.file.destination}/${req.file.filename}`);
    return;
  }
  res.send("");
});

router.post("/chapters/:story_id", async (req, res) => {
  if (isChapter(req.body)) {
    const result = await dao.createChapter(
      req.params.story_id,
      req.body.title,
      req.body.text,
      req.body.number
    );
    res.send(result);
  } else res.status(400).send();
});

// DELETE
router.delete("/story/:id", async (req, res) => {
  if (uuidValidate(req.params.id)) {
    const result = await dao.deleteStory(req.params.id);
    if (result.rowCount) {
      res.status(200).send();
    } else res.status(500).send();
  } else res.status(400).send();
});

router.delete("/chapters/:id", async (req, res) => {
  if (uuidValidate(req.params.id)) {
    const result = await dao.deleteChapter(req.params.id);
    if (result.rowCount) {
      res.status(200).send();
    } else res.status(500).send();
    res.send(result);
  } else res.status(400).send();
});

router.delete("/icon/:name", async (req, res) => {
  fs.access(`${iconPath}/${req.params.name}`, () => {
    fs.unlink(`${iconPath}/${req.params.name}`, (err) => {
      if (err) {
        res.status(500).send();
      } else res.status(200).send();
      return;
    });
  });
});

export { router as privateRouter };
