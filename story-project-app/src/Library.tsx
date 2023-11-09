import "./Library.css";
import { Story } from "./mockData";

function Library(props: {
  stories: Story[];
  selectedStoryId: string;
  onClickStory: (id: string) => void;
  onAdmin: boolean;
}) {
  return (
    <div className="library">
      {props.onAdmin && (
        <div className="story box-button">
          <p style={{ fontStyle: "italic" }}>+ Add New Story</p>
        </div>
      )}
      {props.stories.map((story) => {
        return (
          <div
            key={story.id}
            className={
              props.selectedStoryId === story.id
                ? "story story-selected box-button"
                : "story box-button"
            }
            onClick={() => props.onClickStory(story.id)}
          >
            <div
              className="story-icon-bg"
              style={{ backgroundImage: "url(" + story.icon + ")" }}
            />
            <p>{story.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Library;
