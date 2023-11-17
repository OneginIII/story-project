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
  const currentChapter = Number(chapter) ? Number(chapter) - 1 : 0;
  const isStringChapter = chapter && !Number(chapter);
  const [showDelete, setShowDelete] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");
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
  const [chapterData, setChapterData] = useState<IChapter[]>([]);

  useEffect(() => {
    if (!props.new) {
      storyService.getStory(props.id).then((serverStory) => {
        setStoryData(serverStory);
        if (serverStory.id) {
          storyService.getChapters(props.id).then((serverChapters) => {
            setChapterData(serverChapters);
            if (serverChapters.length > 0) {
              setEditedTitle(serverChapters[currentChapter].title);
              setEditedText(serverChapters[currentChapter].text);
            } else {
              navigate("../new");
            }
          });
        }
      });
    } else {
      setEditedTitle("");
      setEditedText("");
    }
  }, [props.id, props.new, navigate, currentChapter]);

  const handleSetCurrentChapter = (val: number, refresh: boolean = false) => {
    if (chapterData[val]) {
      navigate(`../` + String(val + 1));
    }
    // This is a workaround for having the page navigate to the same chapter number after deleting a chapter.
    // Since the route doesn't change the page doesn't redraw and gets stuck with the <NotFound> component.
    if (refresh) {
      navigate(0);
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
      })
      .then((response) => {
        console.log(response.status);
        setStoryData(response.data);
        handleSetCurrentChapter(currentChapter);
      });
  };

  const handleDelete = (event: FormEvent) => {
    event.preventDefault();
    setShowDelete(false);
    adminService
      .deleteChapter(chapterData[currentChapter].id)
      .then((response) => {
        console.log(response.status);
        setStoryData(response.data);
        handleSetCurrentChapter(
          Math.max(currentChapter - 1, 0),
          currentChapter === 0
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
      })
      .then((response) => {
        console.log(response.status);
        setStoryData(response.data);
        // Not going through the usual handleSetCurrentChapter since it has the old chapter.length (I think anyway)
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
