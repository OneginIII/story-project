import { useEffect } from "react";
import ChapterButton from "./ChapterButton";
import "./Content.css";
import { Story } from "../mockData";
import { useParams } from "react-router-dom";

function StoryContent(props: {
  story: Story;
  setCurrentChapter: (val: number) => void;
}) {
  const { chapter } = useParams();
  const currentChapter = Number(chapter) - 1;

  // Keyboard navigation for story content.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "ArrowLeft") {
        if (currentChapter > 0) {
          props.setCurrentChapter(currentChapter - 1);
        }
      } else if (event.key == "ArrowRight") {
        if (currentChapter < props.story.chapters.length - 1) {
          props.setCurrentChapter(currentChapter + 1);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="content">
      {props.story.icon !== "" && currentChapter === 0 && (
        <img className="content-icon" src="/icons/night-icon.svg" />
      )}
      <h2>{props.story?.title}</h2>
      <div className="chapter-select">
        {props.story?.chapters.map((_chapter, index) => {
          return (
            <ChapterButton
              key={index}
              text={String(index + 1)}
              selected={currentChapter === index}
              onChapterClick={props.setCurrentChapter}
              targetChapter={index}
            />
          );
        })}
      </div>
      <div className="content-body">
        <h3>
          {/*Something (Prettier?) really wants to add that {" "} here for some reason.*/}
          Chapter {currentChapter + 1} –{" "}
          {props.story?.chapters[currentChapter].title}
        </h3>
        <p>{props.story?.chapters[currentChapter].text}</p>
      </div>
      <div className="bottom-chapter-select">
        <div className="chapter-select" style={{ gap: "3em", flex: 1 }}>
          {currentChapter > 0 && (
            <ChapterButton
              text="⭠"
              selected={false}
              onChapterClick={props.setCurrentChapter}
              targetChapter={
                (currentChapter - 1) % props.story?.chapters.length
              }
            />
          )}
          {currentChapter < props.story.chapters.length - 1 && (
            <ChapterButton
              text="⭢"
              selected={false}
              onChapterClick={props.setCurrentChapter}
              targetChapter={
                (currentChapter + 1) % props.story?.chapters.length
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryContent;
