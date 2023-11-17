// GET
const getStories = "SELECT * FROM stories;";
const getStory = "SELECT * FROM stories WHERE id = $1;";
const geChapters = "SELECT * FROM chapters WHERE story_id = $1;";

// PUT
const updateStory =
  "UPDATE stories SET title = $2, icon = $3, url = $4, visible = $5, modified_at = NOW() WHERE id = $1;";
const updateChapter =
  "UPDATE chapters SET title = $2, text = $3, modified_at = NOW() WHERE id = $1;";

// POST
const createStory =
  "INSERT INTO stories (title, icon, url, visible, created_at, modified_at) VALUES ($1, $2, $3, $4, NOW(), NOW());";
const createChapter =
  "INSERT INTO chapters (story_id, title, text, created_at, modified_at) VALUES($1, $2, $3, NOW(), NOW());";

const deleteStory = "DELETE FROM stories WHERE id = $1;";
const deleteChapter = "DELETE FROM chapters WHERE id = $1;";

export {
  getStories,
  getStory,
  geChapters,
  updateStory,
  updateChapter,
  createStory,
  createChapter,
  deleteStory,
  deleteChapter,
};
