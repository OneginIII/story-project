// DEPRECATED for now

import { useState } from "react";
import StoryEdit from "./StoryEdit";
import ChapterEdit from "./ChapterEdit";
import { Story } from "../../mockData";

function Edit(props: {
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
          story={props.story}
          setCurrentChapter={props.setCurrentChapter}
          onEditStory={() => null}
        />
      )}
    </>
  );
}

export default Edit;
