import { useContext } from "react";
import "./Library.css";
import { Story } from "../mockData";
import { AdminContext } from "../index";
import { Link, NavLink } from "react-router-dom";

function Library(props: { stories: Story[] }) {
  const admin = useContext(AdminContext);
  return (
    <div className="library">
      {admin && (
        <Link
          style={{ fontStyle: "italic" }}
          to={"/new"}
          className="story box-button"
        >
          + Add New Story
        </Link>
      )}
      {props.stories.map((story) => {
        return (
          <NavLink
            to={`/${story.url}/1`}
            key={story.id}
            className={"story box-button"}
          >
            <div
              className="story-icon-bg"
              style={{ backgroundImage: "url(" + story.icon + ")" }}
            />
            {story.title}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Library;
