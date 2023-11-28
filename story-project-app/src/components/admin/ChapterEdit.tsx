import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import ChapterButton from "../ChapterButton";
import "./Edit.css";
import Modal from "../Modal";
import storyService from "../../storyService";
import { IChapter, IStory } from "../../types";
import adminService from "../../adminService";
import NotFound from "../../NotFound";

function ChapterEdit(props: { id: string; new?: boolean }) {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const [currentChapter, setCurrentChapter] = useState(
    Number(chapter) ? Number(chapter) - 1 : 0
  );
  const isStringChapter = chapter && !Number(chapter);
  const [showDelete, setShowDelete] = useState(false);
  const [chapterData, setChapterData] = useState<IChapter[]>([]);
  const [storyData, setStoryData] = useState<IStory>({
    title: "",
    created_at: "",
    icon: "",
    id: "",
    url: "",
    visible: true,
    modified_at: "",
    created_by: "",
  });
  const [editedTitle, setEditedTitle] = useState("Loading...");
  const [editedText, setEditedText] = useState("Loading...");
  const [editedNumber, setEditedNumber] = useState(1);
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    setCurrentChapter(Number(chapter) ? Number(chapter) - 1 : 0);
    if (!props.new) {
      storyService.getStory(props.id).then((serverStory) => {
        setStoryData(serverStory);
        if (serverStory.id) {
          storyService.getChapters(props.id).then((serverChapters) => {
            setChapterData(serverChapters);
            if (serverChapters.length > 0) {
              setEditedTitle(serverChapters[currentChapter].title);
              setEditedText(serverChapters[currentChapter].text);
              setTextLength(serverChapters[currentChapter].text.length);
              setEditedNumber(serverChapters[currentChapter].number);
            } else {
              navigate("../new");
            }
          });
        }
      });
    } else {
      setEditedTitle("");
      setEditedText("");
      setTextLength(0);
      setEditedNumber(1);
    }
  }, [props.id, props.new, navigate, currentChapter, chapter]);

  const handleSetCurrentChapter = (val: number, empty?: boolean) => {
    if (chapterData.length < 1) {
      navigate(`../new`);
    }
    if (chapterData[val]) {
      setCurrentChapter(val);
      navigate(`../` + String(val + 1));
    }
    if (empty) {
      navigate(`../`);
    }
  };

  const handleStoryEdit = () => {
    navigate(`/admin/edit/${storyData.url}`);
  };

  const handleEdit = (event: FormEvent) => {
    event.preventDefault();
    adminService
      .updateChapter(chapterData[currentChapter].id, {
        id: "",
        title: editedTitle,
        text: editedText,
        number: editedNumber,
      })
      .then(() => {
        handleSetCurrentChapter(currentChapter);
      });
  };

  const handleDelete = (event: FormEvent) => {
    event.preventDefault();
    setShowDelete(false);
    adminService.deleteChapter(chapterData[currentChapter].id).then(() => {
      handleSetCurrentChapter(
        Math.max(currentChapter - 1, 0),
        // This is a hack to fix the refresh on chapter delete 0 fix
        currentChapter === 0 && chapter !== undefined
      );
    });
  };

  const handleCreate = (event: FormEvent) => {
    event.preventDefault();
    adminService
      .createChapter(storyData.id, {
        id: "",
        title: editedTitle,
        text: editedText,
        number: chapterData.length + 1,
      })
      .then(() => {
        navigate("../" + (chapterData.length + 1));
      });
  };

  if (
    !storyData ||
    (!props.new && !chapterData[currentChapter]) ||
    isStringChapter
  ) {
    return <NotFound />;
  }

  return (
    <>
      <form onSubmit={props.new ? handleCreate : handleEdit} className="edit">
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
          {chapterData.map((_chapter: IChapter, index: number) => {
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
        <label htmlFor="title">
          Title
          <span className="help-text">(max 100 characters long)</span>
        </label>
        <input
          type="text"
          id="title"
          value={editedTitle}
          style={{ width: "90%" }}
          onChange={(e) => setEditedTitle(e.target.value)}
          required
          maxLength={100}
        />
        <label
          style={{ display: "flex", marginBottom: "0" }}
          htmlFor="chapter-text"
        >
          Chapter text
          <span className="help-text">
            (max {(10000).toLocaleString()} characters long)
          </span>
          <span style={{ marginLeft: "auto" }}>
            {textLength.toLocaleString()} / {(10000).toLocaleString()}
          </span>
        </label>
        <textarea
          id="chapter-text"
          value={editedText}
          onChange={(e) => {
            setEditedText(e.target.value);
            setTextLength(e.target.value.length);
          }}
          required
          maxLength={10000}
        ></textarea>
        {!props.new && (
          <>
            <label htmlFor="chapter-number">
              Chapter number
              <span className="help-text">
                (number used to sort chapters)
                <span className="help-warning">
                  {" "}
                  Experimental, changes sorting on this page too!
                </span>
              </span>
            </label>
            <input
              style={{ maxWidth: "6em" }}
              id="chapter-number"
              type="number"
              value={editedNumber}
              onChange={(e) => setEditedNumber(Number(e.target.value))}
            />
          </>
        )}
        <div className="horizontal-buttons">
          {!props.new && (
            <button
              type="button"
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
          onConfirm={handleDelete}
          onClose={() => setShowDelete(false)}
        />
      </Modal>
    </>
  );
}

export default ChapterEdit;
