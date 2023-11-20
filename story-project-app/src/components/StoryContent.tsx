import { useEffect, useState } from "react";
import ChapterButton from "./ChapterButton";
import "./Content.css";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import storyService, { serverUrl } from "../storyService";
import { IChapter, IStory } from "../types";

function StoryContent(props: { id: string }) {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const currentChapter = Number(chapter) ? Number(chapter) - 1 : 0;
  const isStringChapter = chapter && !Number(chapter);
  const [storyData, setStoryData] = useState<IStory>({
    title: "",
    icon: "",
    id: "",
    url: "",
    created_by: "",
    visible: true,
    created_at: "",
    modified_at: "",
  });
  const [chapterData, setChapterData] = useState<IChapter[]>([]);

  useEffect(() => {
    storyService.getStory(props.id).then((serverStory) => {
      setStoryData(serverStory);
      if (serverStory.id) {
        storyService.getChapters(serverStory.id).then((serverChapters) => {
          setChapterData(serverChapters);
        });
      }
    });
  }, [props.id]);

  // Keyboard navigation for story content.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "ArrowLeft") {
        if (currentChapter > 0) {
          handleSetCurrentChapter(currentChapter - 1);
        }
      } else if (event.key == "ArrowRight") {
        if (currentChapter < chapterData.length - 1) {
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
    if (chapterData[val]) {
      navigate(`../` + String(val + 1));
    }
  };

  if (!chapterData[currentChapter] || isStringChapter) {
    return <NotFound />;
  }

  return (
    <div className="content">
      {storyData.icon !== "" && currentChapter === 0 && (
        <img className="content-icon" src={`${serverUrl}/${storyData.icon}`} />
      )}
      <h2>{storyData?.title}</h2>
      <div className="chapter-select">
        {chapterData.map((_chapter, index) => {
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
          Chapter {currentChapter + 1} – {chapterData[currentChapter].title}
        </h3>
        <p>{chapterData[currentChapter].text}</p>
      </div>
      <div className="bottom-chapter-select">
        <div className="chapter-select" style={{ gap: "3em", flex: 1 }}>
          {currentChapter > 0 && (
            <ChapterButton
              text="⭠"
              selected={false}
              onChapterClick={handleSetCurrentChapter}
              targetChapter={(currentChapter - 1) % chapterData.length}
            />
          )}
          {currentChapter < chapterData.length - 1 && (
            <ChapterButton
              text="⭢"
              selected={false}
              onChapterClick={handleSetCurrentChapter}
              targetChapter={(currentChapter + 1) % chapterData.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryContent;
