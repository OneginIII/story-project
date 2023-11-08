import "./Edit.css";

function StoryEdit() {
  return (
    <form className="edit">
      <div className="content-title">
        <h2>Edit story</h2>
      </div>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" />
      <div style={{ marginBottom: "0" }}>
        <label htmlFor="icon">Icon</label>
        <input type="file" id="icon" />
      </div>
      <label htmlFor="url">URL</label>
      <input type="url" id="url" />
      <div className="horizontal-buttons">
        <button className="btn-danger">Delete story</button>
        <button>Edit story</button>
      </div>
    </form>
  );
}

export default StoryEdit;
