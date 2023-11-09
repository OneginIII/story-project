import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import { Story } from "./mockData";
import ChapterButton from "./ChapterButton";
import "./Edit.css";
import Modal from "./Modal";

function ChapterEdit(props: {
  story: Story;
  currentChapter: number;
  setCurrentChapter: (num: number) => void;
  onEditStory: (set: boolean) => void;
}) {
  const [showDelete, setShowDelete] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    setEditedTitle(
      props.story ? props.story.chapters[props.currentChapter].title : ""
    );
    setEditedText(
      props.story ? props.story.chapters[props.currentChapter].text : ""
    );
  }, [props.story, props.currentChapter]);

  return (
    <>
      {props.story !== undefined ? (
        <>
          <form onSubmit={(e) => e.preventDefault()} className="edit">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>{props.story.title}</h2>
              <button onClick={() => props.onEditStory(true)}>
                Edit story
              </button>
            </div>
            <h2>Edit chapter</h2>
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
              <ChapterButton
                text="+"
                selected={false}
                onChapterClick={props.setCurrentChapter}
                targetChapter={props.currentChapter}
              />
            </div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={editedTitle}
              style={{ width: "90%" }}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <label htmlFor="chapter-text">Chapter text</label>
            <br />
            <textarea
              id="chapter-text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            ></textarea>
            <div className="horizontal-buttons">
              <button
                className="btn-danger"
                onClick={() => {
                  setShowDelete(true);
                }}
              >
                Delete chapter
              </button>
              <button type="submit">Confirm edit</button>
            </div>
          </form>
        </>
      ) : (
        <h2>Select a story</h2>
      )}
      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)}>
        <DeleteModal
          toDeleteText="chapter"
          onClose={() => setShowDelete(false)}
        />
      </Modal>
    </>
  );
}

export default ChapterEdit;
