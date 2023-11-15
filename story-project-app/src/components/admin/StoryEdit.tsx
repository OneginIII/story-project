import { useEffect, useState, FormEvent } from "react";
import DeleteModal from "./DeleteModal";
import "./Edit.css";
import Modal from "../Modal";
import storyService from "../../storyService";
import { IStory } from "../../types";
import adminService from "../../adminService";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function StoryEdit(props: {
  url: string;
  onChapterEdit: (set: boolean) => void;
  new?: boolean;
}) {
  const navigate = useNavigate();
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
        setNewTitle(serverStory.title);
        setNewUrl(serverStory.url);
      });
    } else {
      setNewTitle("");
      setNewIcon("");
      setNewUrl("");
    }
  }, [props.url, props.new]);

  const handleEdit = (event: FormEvent) => {
    event.preventDefault();
    adminService
      .updateStory(storyData.id, {
        ...storyData,
        title: newTitle,
        icon: newIcon,
        url: newUrl,
      })
      .then((response) => {
        console.log(response.status);
        setStoryData(response.data);
        navigate(`../${response.data.url}`);
        navigate(0);
      });
  };

  const handleCreate = (event: FormEvent) => {
    event.preventDefault();
    adminService
      .createStory({
        title: newTitle,
        chapters: [],
        dateCreated: new Date(),
        icon: newIcon,
        id: uuidv4(),
        url: newUrl,
        visible: false,
      })
      .then((response) => {
        console.log(response.status);
        navigate(`../${response.data.url}`);
        navigate(0);
      });
  };

  const handleDelete = (event: FormEvent) => {
    event.preventDefault();
    adminService.deleteStory(storyData.id).then((response) => {
      console.log(response.status);
      navigate(`../`);
      navigate(0);
    });
  };

  return (
    <>
      <form className="edit" onSubmit={props.new ? handleCreate : handleEdit}>
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
                type="button"
                className="btn-danger"
                onClick={() => setShowDelete(true)}
              >
                Delete story
              </button>
              <button type="button" onClick={() => props.onChapterEdit(false)}>
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
          onConfirm={handleDelete}
          toDeleteText="story"
          onClose={() => setShowDelete(false)}
        />
      </Modal>
    </>
  );
}

export default StoryEdit;
