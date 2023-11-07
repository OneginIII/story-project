import "./Library.css";
import { Story } from "./mockData";

function Library(props: {
  stories: Story[];
  selectedStoryId: string;
  onClickStory: (id: string) => void;
}) {
  return (
    <div className="library">
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
            <p>{story.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Library;
