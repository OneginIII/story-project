import { useEffect, useState } from "react";
import ChapterButton from "./ChapterButton";
import "./Content.css";
import { IStory } from "../mockData";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import storyService from "../storyService";

function StoryContent(props: { url: string }) {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const currentChapter = Number(chapter) ? Number(chapter) - 1 : 0;
  const isStringChapter = chapter && !Number(chapter);
  const [storyData, setStoryData] = useState<IStory>({
    title: "",
    chapters: [],
    dateCreated: new Date(),
    icon: "",
    id: "",
    url: "",
    visible: true,
  });

  useEffect(() => {
    storyService.getStoryByUrl(props.url).then((serverStory) => {
      setStoryData(serverStory);
    });
  }, [props.url]);

  // Keyboard navigation for story content.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "ArrowLeft") {
        if (currentChapter > 0) {
          handleSetCurrentChapter(currentChapter - 1);
        }
      } else if (event.key == "ArrowRight") {
        if (currentChapter < storyData.chapters.length - 1) {
          handleSetCurrentChapter(currentChapter + 1);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleSetCurrentChapter = (val: number) => {
    if (storyData.chapters[val]) {
      navigate(`../` + String(val + 1));
    }
  };

  if (!storyData.chapters[currentChapter] || isStringChapter) {
    return <NotFound />;
  }

  return (
    <div className="content">
      {storyData.icon !== "" && currentChapter === 0 && (
        <img className="content-icon" src="/icons/night-icon.svg" />
      )}
      <h2>{storyData?.title}</h2>
      <div className="chapter-select">
        {storyData?.chapters.map((_chapter, index) => {
          return (
            <ChapterButton
              key={index}
              text={String(index + 1)}
              selected={currentChapter === index}
              onChapterClick={handleSetCurrentChapter}
              targetChapter={index}
            />
          );
        })}
      </div>
      <div className="content-body">
        <h3>
          {/*Something (Prettier?) really wants to add that {" "} here for some reason. (Maybe end of line)*/}
          Chapter {currentChapter + 1} –{" "}
          {storyData?.chapters[currentChapter].title}
        </h3>
        <p>{storyData?.chapters[currentChapter].text}</p>
      </div>
      <div className="bottom-chapter-select">
        <div className="chapter-select" style={{ gap: "3em", flex: 1 }}>
          {currentChapter > 0 && (
            <ChapterButton
              text="⭠"
              selected={false}
              onChapterClick={handleSetCurrentChapter}
              targetChapter={(currentChapter - 1) % storyData?.chapters.length}
            />
          )}
          {currentChapter < storyData.chapters.length - 1 && (
            <ChapterButton
              text="⭢"
              selected={false}
              onChapterClick={handleSetCurrentChapter}
              targetChapter={(currentChapter + 1) % storyData?.chapters.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryContent;
