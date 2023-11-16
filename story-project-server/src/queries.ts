const getStories = "SELECT * FROM stories";
const getStoryByUrl = "SELECT * FROM stories WHERE url = $1";
const getChaptersByStoryId = "SELECT * FROM chapters WHERE story_id = $1";
const getChapterByStoryUrlAndNumber =
  "SELECT * FROM chapters WHERE story_id = (SELECT id FROM stories WHERE url = $1) AND number = $2";
const getChapterCountByUrl =
  "SELECT COUNT(*) FROM chapters WHERE story_id = (SELECT id FROM stories WHERE url = $1)";

export {
  getStories,
  getChaptersByStoryId,
  getStoryByUrl,
  getChapterByStoryUrlAndNumber,
  getChapterCountByUrl,
};
