import { executeQuery } from "./db";
import * as queries from "./queries";

// GET
const getStories = async () => {
  console.log("Getting stories...");
  const result = await executeQuery(queries.getStories);
  console.log(`Found ${result.rows.length} stories.`);
  return result;
};

const getStory = async (id: string) => {
  console.log(`Getting story with url ${id}.`);
  const result = await executeQuery(queries.getStory, [id]);
  console.log(result.rows.length ? "Found story." : "Didn't find story.");
  return result;
};

const getChapters = async (story_id: string) => {
  console.log(`Getting chapters for story id ${story_id}.`);
  const result = await executeQuery(queries.geChapters, [story_id]);
  console.log(`Found ${result.rows.length} chapters.`);
  return result;
};

// PUT
const updateStory = async (
  id: string,
  title: string,
  icon: string,
  url: string,
  visible: boolean
) => {
  console.log(`Updating story id ${id}.`);
  const result = await executeQuery(queries.updateStory, [
    id,
    title,
    icon,
    url,
    visible,
  ]);
  console.log(`Story id ${id} updated successfully.`);
  return result;
};

const updateChapter = async (id: string, title: string, text: string) => {
  console.log(`Updating chapter id ${id}.`);
  const result = await executeQuery(queries.updateChapter, [id, title, text]);
  console.log(`Chapter id ${id} updated successfully`);
  return result;
};

// POST
const createStory = async (
  title: string,
  icon: string,
  url: string,
  visible: boolean
) => {
  console.log(`Creating story ${title}.`);
  const result = await executeQuery(queries.createStory, [
    title,
    icon,
    url,
    visible,
  ]);
  console.log(`Story ${title} created successfully.`);
  return result;
};

const createChapter = async (story_id: string, title: string, text: string) => {
  console.log(`Creating chapter ${title} to story id ${story_id}.`);
  const result = await executeQuery(queries.createChapter, [
    story_id,
    title,
    text,
  ]);
  console.log(
    `Chapter ${title} was succesfully added to story id ${story_id}.`
  );
  return result;
};

// DELETE
const deleteStory = async (id: string) => {
  console.log(`Deleting story id ${id}.`);
  const result = await executeQuery(queries.deleteStory, [id]);
  console.log(`Story id ${id} was deleted successfully.`);
  return result;
};

const deleteChapter = async (id: string) => {
  console.log(`Deleting chapter id ${id}.`);
  const result = await executeQuery(queries.deleteChapter, [id]);
  console.log(`Chapter id ${id} was successfully deleted.`);
  return result;
};

export default {
  getStories,
  getStory,
  getChapters,
  updateStory,
  updateChapter,
  createStory,
  createChapter,
  deleteStory,
  deleteChapter,
};
