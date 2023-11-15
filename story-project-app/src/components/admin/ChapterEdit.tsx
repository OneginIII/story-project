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

function ChapterEdit(props: { url: string; new?: boolean }) {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const currentChapter = Number(chapter) ? Number(chapter) - 1 : 0;
  const isStringChapter = chapter && !Number(chapter);
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
    if (!props.new) {
      storyService.getStoryByUrl(props.url).then((serverStory) => {
        setStoryData(serverStory);
        if (serverStory.chapters.length > 0) {
          setEditedTitle(serverStory.chapters[currentChapter].title);
          setEditedText(serverStory.chapters[currentChapter].text);
        } else {
          navigate("../new");
        }
      });
    } else {
      setEditedTitle("");
      setEditedText("");
    }
  }, [props.url, props.new, navigate, currentChapter]);

  const handleSetCurrentChapter = (val: number, refresh: boolean = false) => {
    if (storyData.chapters[val]) {
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
      .updateChapter(storyData.id, currentChapter, {
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
      .deleteChapter(storyData.id, currentChapter)
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
        title: editedTitle,
        text: editedText,
      })
      .then((response) => {
        console.log(response.status);
        setStoryData(response.data);
        console.log(storyData.chapters.length);
        // Not going through the usual handleSetCurrentChapter since it has the old chapter.length (I think anyway)
        navigate("../" + (storyData.chapters.length + 1));
      });
  };

  if (
    !storyData ||
    (!props.new && !storyData.chapters[currentChapter]) ||
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
          {storyData?.chapters.map((_chapter: IChapter, index: number) => {
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
