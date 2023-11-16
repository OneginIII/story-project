import { executeQuery } from "./db";
import * as queries from "./queries";

const getStories = async () => {
  console.log("Getting stories...");
  const result = await executeQuery(queries.getStories);
  console.log(`Found ${result.rows.length} stories.`);
  return result;
};

const getStory = async (url: string) => {
  console.log(`Getting story with url ${url}.`);
  const result = await executeQuery(queries.getStoryByUrl, [url]);
  console.log(result.rows.length ? "Found story." : "Didn't find story.");
  return result;
};

const getStoryChapter = async (url: string, chapter: number) => {
  console.log(`Getting chapter ${chapter} of story url ${url}`);
  const result = await executeQuery(queries.getChapterByStoryUrlAndNumber, [
    url,
    chapter,
  ]);
  console.log(result.rows.length ? "Found chapter." : "Didn't find chapter.");
  return result;
};

const getChapterCount = async (url: string) => {
  console.log(`Getting chapter count for story url ${url}.`);
  const result = await executeQuery(queries.getChapterCountByUrl, [url]);
  console.log(`Result is ${result.rows[0]["count"]} chapters.`);
  return result;
};

const getChapters = async (story_id: string) => {
  console.log(`Getting chapters for story id ${story_id}.`);
  const result = await executeQuery(queries.getChaptersByStoryId, [story_id]);
  console.log(`Found ${result.rows.length} chapters.`);
  return result;
};

export default {
  getStories,
  getStory,
  getStoryChapter,
  getChapterCount,
  getChapters,
};
