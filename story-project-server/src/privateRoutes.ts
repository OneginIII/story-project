import express from "express";
import "dotenv/config";
import dao from "./dao";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/icons");
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id + ".svg");
  },
});
const upload = multer({ storage: storage });

// Stories private

// PUT
router.put("/story/:id", async (req, res) => {
  const result = await dao.updateStory(
    req.params.id,
    req.body.title,
    req.body.icon,
    req.body.url,
    req.body.visible
  );
  res.send(result);
});

router.put("/chapters/:id", async (req, res) => {
  const result = await dao.updateChapter(
    req.params.id,
    req.body.title,
    req.body.text
  );
  res.send(result);
});

// POST
router.post("/story", async (req, res) => {
  const result = await dao.createStory(
    req.body.title,
    req.body.icon,
    req.body.url,
    req.body.visible
  );
  res.send(result);
});

router.post("/story/:id/icon", upload.single("icon"), async (req, res) => {
  if (req.file) {
    res.send(`${req.file.destination}/${req.file.filename}`);
    return;
  }
  res.send("");
});

router.post("/chapters/:story_id", async (req, res) => {
  const result = await dao.createChapter(
    req.params.story_id,
    req.body.title,
    req.body.text
  );
  res.send(result);
});

// DELETE
router.delete("/story/:id", async (req, res) => {
  const result = await dao.deleteStory(req.params.id);
  res.send(result);
});

router.delete("/chapters/:id", async (req, res) => {
  const result = await dao.deleteChapter(req.params.id);
  res.send(result);
});

export { router as privateRouter };
