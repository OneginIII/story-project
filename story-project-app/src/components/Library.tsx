import "./Library.css";
import { Link, NavLink } from "react-router-dom";
import { serverUrl } from "../storyService";
import { IStory } from "../types";
import { useAuth } from "../loginService";

function Library(props: { stories: IStory[] }) {
  const auth = useAuth();

  return (
    <div className="library">
      {auth?.token && (
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
      {props.stories.map((story) => {
        if (auth?.token || story.visible) {
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
                style={{ backgroundImage: `url(${serverUrl}/${story.icon})` }}
              />
              {story.title}
              {auth?.token && (
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
