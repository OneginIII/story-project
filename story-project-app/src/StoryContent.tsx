import ChapterButton from "./ChapterButton";
import "./Content.css";
import { Story } from "./mockData";

function StoryContent(props: {
  story: Story;
  currentChapter: number;
  setCurrentChapter: (val: number) => void;
}) {
  return (
    <div className="content">
      {props.story.icon !== "" && props.currentChapter === 0 && (
        <img className="content-icon" src="/icons/night-icon.svg" />
      )}
      <div className="content-title">
        <h2>{props.story?.title}</h2>
      </div>
      <div className="chapter-select">
        {props.story?.chapters.map((_chapter, index) => {
          return (
            <ChapterButton
              key={index}
              text={String(index + 1)}
              selected={props.currentChapter === index}
              onChapterClick={props.setCurrentChapter}
              targetChapter={index}
            />
          );
        })}
      </div>
      <div className="content-body">
        <h3>
          {/*Something (Prettier?) really wants to add that {" "} here for some reason.*/}
          Chapter {props.currentChapter + 1} –{" "}
          {props.story?.chapters[props.currentChapter].title}
        </h3>
        <p>{props.story?.chapters[props.currentChapter].text}</p>
      </div>
      <div className="bottom-chapter-select">
        <div className="chapter-select" style={{ gap: "3em", flex: 1 }}>
          {props.currentChapter > 0 && (
            <ChapterButton
              text="⭠"
              selected={false}
              onChapterClick={props.setCurrentChapter}
              targetChapter={
                (props.currentChapter - 1) % props.story?.chapters.length
              }
            />
          )}
          {props.currentChapter < props.story.chapters.length - 1 && (
            <ChapterButton
              text="⭢"
              selected={false}
              onChapterClick={props.setCurrentChapter}
              targetChapter={
                (props.currentChapter + 1) % props.story?.chapters.length
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryContent;
