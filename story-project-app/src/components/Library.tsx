import { useContext, useEffect, useState } from "react";
import "./Library.css";
import { AdminContext } from "../index";
import { Link, NavLink } from "react-router-dom";
import storyService from "../storyService";
import { IStory } from "../types";

function Library() {
  const admin = useContext(AdminContext);
  const [stories, setStories] = useState<IStory[]>([]);

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
        if (admin || story.visible) {
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
              {admin && (
                <img
                  className={
                    story.visible ? "visible-icon" : "visible-icon icon-hidden"
                  }
                  src={story.visible ? "/ui/showTrue.svg" : "/ui/showFalse.svg"}
                />
              )}
            </NavLink>
          );
        }
      })}
    </div>
  );
}

export default Library;
