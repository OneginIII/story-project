import { useContext, useEffect, useState } from "react";
import "./Library.css";
import { AdminContext } from "../index";
import { Link, NavLink } from "react-router-dom";
import storyService from "../storyService";
import { IDBStory } from "../types";

function Library() {
  const admin = useContext(AdminContext);
  const [stories, setStories] = useState<IDBStory[]>([]);

  useEffect(() => {
    storyService.getStoryList().then((serverStories) => {
      setStories(serverStories);
    });
  }, []);

  return (
    <div className="library">
      {admin && (
        <Link
          style={{ fontStyle: "italic" }}
          to={"new"}
          className={
            window.location.href.includes("admin/new")
              ? "story box-button active"
              : "story box-button"
          }
        >
          + Add New Story
        </Link>
      )}
      {stories.map((story) => {
        return (
          <NavLink
            to={`${story.url}/`}
            key={story.url}
            className={
              window.location.href.includes(story.url)
                ? "story box-button active"
                : "story box-button"
            }
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
