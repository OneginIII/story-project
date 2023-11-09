import { useState } from "react";
import DeleteModal from "./DeleteModal";
import "./Edit.css";
import { Story } from "./mockData";

function StoryEdit(props: {
  story: Story;
  onChapterEdit: (set: boolean) => void;
}) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <form className="edit">
        <h2>Edit story</h2>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" defaultValue={props.story.title} />
        <div style={{ marginBottom: "0" }}>
          <label htmlFor="icon">Icon</label>
          <input type="file" id="icon" />
        </div>
        <label htmlFor="url">URL</label>
        <input type="text" id="url" defaultValue={props.story.url} />
        <div className="horizontal-buttons">
          <button className="btn-danger" onClick={() => setShowDelete(true)}>
            Delete story
          </button>
          <button onClick={() => props.onChapterEdit(false)}>
            Back to chapter edit
          </button>
          <button>Confirm edit</button>
        </div>
      </form>
      {showDelete && (
        <DeleteModal toDeleteText="story" onClose={setShowDelete} />
      )}
    </>
  );
}

export default StoryEdit;
