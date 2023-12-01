import { useContext } from "react";
import "./Library.css";
import { Link, NavLink } from "react-router-dom";
import { serverUrl } from "../storyService";
import { IStory } from "../types";
import { AdminContext } from "..";

function Library(props: { stories: IStory[] }) {
  const admin = useContext(AdminContext);

  return (
    <div className="library">
      {admin && (
        <Link
          style={{ fontStyle: "italic" }}
          to={"/admin/new"}
          className={
            window.location.href.includes("admin/new")
              ? "story box-button active"
              : "story box-button"
          }
          relative="path"
        >
          + Add New Story
        </Link>
      )}
      {props.stories.map((story) => {
        if (admin || story.visible) {
          return (
            <NavLink
              to={admin ? `/admin/${story.url}` : `/${story.url}`}
              key={story.url}
              className={
                window.location.href.includes(story.url)
                  ? "story box-button active"
                  : "story box-button"
              }
              relative="path"
            >
              <div
                className="story-icon-bg"
                style={{ backgroundImage: `url(${serverUrl}/${story.icon})` }}
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
