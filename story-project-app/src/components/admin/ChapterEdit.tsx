import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import { IStory } from "../../mockData";
import ChapterButton from "../ChapterButton";
import "./Edit.css";
import Modal from "../Modal";
import storyService from "../../storyService";

function ChapterEdit(props: { url: string; new?: boolean }) {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const currentChapter = Number(chapter) ? Number(chapter) - 1 : 0;
  const [showDelete, setShowDelete] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");
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

  useEffect(() => {
    setEditedTitle(
      storyData.chapters.length > 0
        ? storyData.chapters[currentChapter].title
        : ""
    );
    setEditedText(
      storyData.chapters.length > 0
        ? storyData.chapters[currentChapter].text
        : ""
    );
    if (props.new) {
      setEditedTitle("");
      setEditedText("");
    }
  }, [storyData, props.new, currentChapter]);

  const handleSetCurrentChapter = (val: number) => {
    if (storyData.chapters[val]) {
      navigate(`../` + String(val + 1));
    }
  };

  const handleStoryEdit = () => {
    navigate(`/admin/edit/${storyData.url}`);
  };

  return (
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
          <h2>{storyData.title}</h2>
          <button onClick={handleStoryEdit}>Edit story</button>
        </div>
        <h2>Edit chapter</h2>
        <div className="chapter-select">
          {storyData?.chapters.map((_chapter, index) => {
            return (
              <ChapterButton
                key={index}
                text={String(index + 1)}
                selected={props.new ? false : currentChapter === index}
                onChapterClick={handleSetCurrentChapter}
                targetChapter={index}
              />
            );
          })}
          <ChapterButton
            text="+"
            selected={props.new ? true : false}
            onChapterClick={() => navigate("../new")}
            targetChapter={currentChapter}
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
          {!props.new && (
            <button
              className="btn-danger"
              onClick={() => {
                setShowDelete(true);
              }}
            >
              Delete chapter
            </button>
          )}
          <button type="submit">
            {props.new ? "Create chapter" : "Confirm edit"}
          </button>
        </div>
      </form>
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
