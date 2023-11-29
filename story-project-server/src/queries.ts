// GET
const getStories = "SELECT * FROM stories ORDER BY created_at;";
const getStory = "SELECT * FROM stories WHERE id = $1;";
const getChapters =
  "SELECT * FROM chapters WHERE story_id = $1 ORDER BY number;";

// PUT
const updateStory =
  "UPDATE stories SET title = $2, icon = $3, url = $4, visible = $5, modified_at = NOW() WHERE id = $1;";
const updateChapter =
  "UPDATE chapters SET title = $2, text = $3, number = $4, modified_at = NOW() WHERE id = $1;";

// POST
const createStory =
  "INSERT INTO stories (id ,title, icon, url, visible, created_at, modified_at) VALUES ($1 ,$2, $3, $4, $5, NOW(), NOW());";
const createChapter =
  "INSERT INTO chapters (story_id, title, text, number, created_at, modified_at) VALUES ($1, $2, $3, $4, NOW(), NOW());";

// DELETE
const deleteStory = "DELETE FROM stories WHERE id = $1;";
const deleteChapter = "DELETE FROM chapters WHERE id = $1;";

// Authenticate
const getUser = "SELECT * FROM users WHERE username = $1;";
const createUser =
  "INSERT INTO users (username, password, created_at) VALUES ($1, $2, NOW());";

export {
  getStories,
  getStory,
  getChapters,
  updateStory,
  updateChapter,
  createStory,
  createChapter,
  deleteStory,
  deleteChapter,
  getUser,
  createUser,
};
