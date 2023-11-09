import { useState } from "react";
import StoryEdit from "./StoryEdit";
import ChapterEdit from "./ChapterEdit";
import { Story } from "./mockData";

function Edit(props: {
  currentChapter: number;
  story: Story;
  setCurrentChapter: (value: number) => void;
}) {
  const [editStory, setEditStory] = useState(false);

  return (
    <>
      {editStory ? (
        <StoryEdit story={props.story} onChapterEdit={setEditStory} />
      ) : (
        <ChapterEdit
          currentChapter={props.currentChapter}
          story={props.story}
          setCurrentChapter={props.setCurrentChapter}
          onEditStory={setEditStory}
        />
      )}
    </>
  );
}

export default Edit;
