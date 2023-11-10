import { useState } from "react";
import StoryEdit from "./StoryEdit";
import ChapterEdit from "./ChapterEdit";
import { Story } from "../../mockData";
import { useParams } from "react-router-dom";

function Edit(props: {
  story: Story;
  setCurrentChapter: (value: number) => void;
}) {
  const { chapter } = useParams();
  const currentChapter = Number(chapter);

  const [editStory, setEditStory] = useState(false);

  return (
    <>
      {editStory ? (
        <StoryEdit story={props.story} onChapterEdit={setEditStory} />
      ) : (
        <ChapterEdit
          currentChapter={currentChapter}
          story={props.story}
          setCurrentChapter={props.setCurrentChapter}
          onEditStory={setEditStory}
        />
      )}
    </>
  );
}

export default Edit;
