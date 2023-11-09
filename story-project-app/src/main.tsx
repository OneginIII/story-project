import Edit from "./Edit";
import Library from "./Library";
import "./Main.css";
import Menu from "./Menu";
import StaticContent from "./StaticContent";
import StoryContent from "./StoryContent";
import { pages, stories } from "./mockData";
import { useState } from "react";

function Main(props: { onAdmin: boolean }) {
  const [currentStory, setCurrentStory] = useState("");
  const [currentChapter, setCurrentChapter] = useState(0);
  const onStoryChange = (newStory: string) => {
    setCurrentStory(newStory);
    setCurrentChapter(0);
    setCurrentPage("");
    setOnStoryContent(true);
  };
  const [currentPage, setCurrentPage] = useState("Home");
  const [onStoryContent, setOnStoryContent] = useState(false);
  const onMenuChange = (newPage: string) => {
    setCurrentPage(newPage);
    setCurrentChapter(0);
    setCurrentStory("");
    setOnStoryContent(false);
  };

  return (
    <main>
      <div className="sidebar">
        {!props.onAdmin && (
          <Menu
            pages={pages}
            currentPage={currentPage}
            onClickMenu={onMenuChange}
          />
        )}
        <Library
          stories={stories}
          selectedStoryId={currentStory}
          onClickStory={onStoryChange}
          onAdmin={props.onAdmin}
        />
      </div>
      {props.onAdmin ? (
        <Edit
          story={stories.filter((story) => story.id === currentStory)[0]}
          currentChapter={currentChapter}
          setCurrentChapter={setCurrentChapter}
        />
      ) : onStoryContent ? (
        <StoryContent
          // Filter instead of find here, because find can return undefined.
          story={stories.filter((story) => story.id === currentStory)[0]}
          currentChapter={currentChapter}
          setCurrentChapter={setCurrentChapter}
        />
      ) : (
        <StaticContent
          title={pages.filter((page) => page.title === currentPage)[0].title}
          text={pages.filter((page) => page.title === currentPage)[0].text}
        />
      )}
    </main>
  );
}

export default Main;
