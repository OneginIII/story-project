import express from "express";
import "dotenv/config";
import { isChapter, isStory, setStories, stories } from "./data";

const router = express.Router();

// Chapters
router.put("/:id/:chapter", (req, res) => {
  if (isChapter(req.body)) {
    const modifiedStory = stories.filter(
      (story) => story.id === req.params.id
    )[0];
    modifiedStory.chapters[Number(req.params.chapter)] = req.body;
    const changedStories = stories.map((story) =>
      story.id === req.params.id ? modifiedStory : story
    );
    setStories(changedStories);
    res.status(200).send(modifiedStory);
  }
});

router.post("/:id/new", (req, res) => {
  if (isChapter(req.body)) {
    const modifiedStory = stories.filter(
      (story) => story.id === req.params.id
    )[0];
    modifiedStory.chapters.push(req.body);
    const changedStories = stories.map((story) =>
      story.id === req.params.id ? modifiedStory : story
    );
    setStories(changedStories);
    res.status(201).send(modifiedStory);
  }
});

router.delete("/:id/:chapter", (req, res) => {
  const storyToEdit = stories.find((story) => story.id === req.params.id);
  if (storyToEdit && storyToEdit.chapters[Number(req.params.chapter)]) {
    const modifiedStory = stories.filter(
      (story) => story.id === req.params.id
    )[0];
    modifiedStory.chapters.splice(Number(req.params.chapter), 1);
    const changedStories = stories.map((story) =>
      story.id === req.params.id ? modifiedStory : story
    );
    setStories(changedStories);
    res.status(204).send(modifiedStory);
  }
});

// Stories
router.put("/:id", (req, res) => {
  if (isStory(req.body)) {
    const modifiedStories = stories.map((story) =>
      story.id === req.params.id ? req.body : story
    );
    setStories(modifiedStories);
    res.status(200).send(req.body);
  }
});

router.post("/new", (req, res) => {
  if (isStory(req.body)) {
    setStories([...stories, req.body]);
    res.status(201).send(req.body);
  }
});

router.delete("/:id", (req, res) => {
  const storyToDelete = stories.find((story) => story.id === req.params.id);
  if (storyToDelete) {
    const changedStories = stories.filter(
      (story) => story.id !== req.params.id
    );
    setStories(changedStories);
    res.status(204).send();
  }
});

export { router as privateRouter };
