import "./Content.css";

function Admin() {
  return (
    <div className="content">
      <h2>Story Project Admin Panel</h2>
      <p>Welcome to the Story Project Admin panel.</p>
      <ul>
        <li>Select a story to edit contents.</li>
        <li>
          Press <span style={{ fontStyle: "italic" }}>Add New Story</span> to
          create a new story.
        </li>
        <li>
          Click the header logo to swap between public and private sides of the
          site.
        </li>
      </ul>
    </div>
  );
}

export default Admin;
