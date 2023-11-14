import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import "./Edit.css";
import { IStory } from "../../mockData";
import Modal from "../Modal";
import storyService from "../../storyService";

function StoryEdit(props: {
  url: string;
  onChapterEdit: (set: boolean) => void;
  new?: boolean;
}) {
  const [showDelete, setShowDelete] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [newUrl, setNewUrl] = useState("");
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
      });
    }
    setNewTitle(storyData ? storyData.title : "");
    setNewUrl(storyData ? storyData.url : "");
    if (props.new) {
      setNewTitle("");
      setNewIcon("");
      setNewUrl("");
    }
  }, [props.url, storyData, props.new]);

  return (
    <>
      <form className="edit" onSubmit={(e) => e.preventDefault()}>
        <h2>{props.new ? "Create story" : "Edit story"}</h2>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <div style={{ marginBottom: "0" }}>
          <label htmlFor="icon">Icon</label>
          <input
            type="file"
            id="icon"
            value={newIcon}
            onChange={(e) => setNewIcon(e.target.value)}
          />
        </div>
        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <div className="horizontal-buttons">
          {!props.new && (
            <>
              <button
                className="btn-danger"
                onClick={() => setShowDelete(true)}
              >
                Delete story
              </button>
              <button onClick={() => props.onChapterEdit(false)}>
                Back to chapter edit
              </button>
            </>
          )}
          <button type="submit">
            {props.new ? "Create story" : "Confirm edit"}
          </button>
        </div>
      </form>
      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)}>
        <DeleteModal
          toDeleteText="story"
          onClose={() => setShowDelete(false)}
        />
      </Modal>
    </>
  );
}

export default StoryEdit;
