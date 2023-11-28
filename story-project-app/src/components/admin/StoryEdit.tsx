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
  id: string;
  onChapterEdit: (set: boolean) => void;
  new?: boolean;
  refreshStories: () => void;
}) {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newIcon, setNewIcon] = useState<File>();
  const [uploadMessage, setUploadMessage] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newVisibility, setNewVisibility] = useState(false);
  const [storyData, setStoryData] = useState<IStory>({
    title: "",
    icon: "",
    id: "",
    url: "",
    visible: false,
    created_by: "",
    modified_at: "",
    created_at: "",
  });
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [createDate, setCreateDate] = useState("");
  const [editDate, setEditDate] = useState("");

  useEffect(() => {
    if (!props.new) {
      storyService.getStory(props.id).then((serverStory) => {
        setStoryData(serverStory);
        setNewTitle(serverStory.title);
        setNewUrl(serverStory.url);
        setNewVisibility(serverStory.visible);
        setCreateDate(serverStory.created_at);
        setEditDate(serverStory.modified_at);
      });
    } else {
      setNewTitle("");
      setNewIcon(undefined);
      setNewUrl("");
      setNewVisibility(false);
    }
  }, [props.id, props.new]);

  const handleIconUpload = async (id: string) => {
    let newIconPath = storyData.icon;
    if (deleteIcon) {
      return "";
    }
    if (newIcon) {
      setUploadMessage("Uploading...");
      await adminService
        .uploadIcon(id, newIcon)
        .then((response) => {
          newIconPath = response?.data;
          setUploadMessage("Upload succesful!");
        })
        .catch((err) => {
          console.error(err);
          setUploadMessage("Upload failed!");
        });
    }
    return newIconPath;
  };

  const handleEdit = async (event: FormEvent) => {
    event.preventDefault();
    if (deleteIcon) {
      adminService.deleteIcon(storyData.icon);
    }
    adminService
      .updateStory(storyData.id, {
        ...storyData,
        title: newTitle,
        icon: await handleIconUpload(storyData.id),
        url: newUrl,
        visible: newVisibility,
      })
      .then((response) => {
        setStoryData(response?.data);
        navigate(`../${newUrl}`);
        props.refreshStories();
      });
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    const newId = uuidv4();
    adminService
      .createStory({
        title: newTitle,
        icon: await handleIconUpload(newId),
        id: newId,
        url: newUrl,
        visible: newVisibility,
        created_by: "",
        created_at: "",
        modified_at: "",
      })
      .then(() => {
        navigate(`../${newUrl}`);
        props.refreshStories();
      });
  };

  const handleDelete = (event: FormEvent) => {
    event.preventDefault();
    if (storyData.icon) {
      adminService.deleteIcon(storyData.icon);
    }
    adminService.deleteStory(storyData.id).then(() => {
      navigate(`../`);
      props.refreshStories();
    });
  };

  return (
    <>
      <form
        className="edit"
        onSubmit={props.new ? handleCreate : handleEdit}
        encType="multipart/form-data"
      >
        <h2>{props.new ? "Create story" : "Edit story"}</h2>
        <label htmlFor="title">
          Title
          <span className="help-text">(max 100 characters long)</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
          maxLength={100}
        />
        <div style={{ marginBottom: "0" }}>
          <label htmlFor="icon">
            Icon <span className="help-text">(.svg files only)</span>
          </label>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <input
              type="file"
              name="icon"
              id="icon"
              onChange={(e) =>
                setNewIcon(e.target.files ? e.target.files[0] : undefined)
              }
              accept=".svg"
              style={{ flex: "1 1" }}
            />
            <span
              style={{
                flex: "1 1",
                fontSize: "14pt",
                fontStyle: "italic",
              }}
            >
              {uploadMessage}
            </span>
            {storyData.icon && (
              <div>
                <label htmlFor="deleteIcon" style={{ color: "#E63333" }}>
                  Delete current icon
                </label>
                <input
                  id="deleteIcon"
                  name="deleteIcon"
                  type="checkbox"
                  onChange={(e) => setDeleteIcon(e.target.checked)}
                  checked={deleteIcon}
                  className="btn-danger"
                  style={{ width: "max-content" }}
                />
              </div>
            )}
          </div>
        </div>
        <label htmlFor="url">
          URL{" "}
          <span className="help-text">
            (a-z, 0-9, -, not "new", all lower-case and max 100 characters long)
          </span>
        </label>
        <input
          type="text"
          name="url"
          id="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          required
          pattern="^(?!(new)$)[a-z\-0-9]*$"
          maxLength={100}
        />
        <div>
          <label htmlFor="visibility" style={{ width: "max-content" }}>
            Public visibility
          </label>
          <input
            name="visibility"
            id="visibility"
            type="checkbox"
            checked={newVisibility}
            onChange={(e) => setNewVisibility(e.target.checked)}
            style={{ width: "max-content" }}
          />
        </div>
        <div className="date-info">
          <p>
            {createDate
              ? "Created: " + new Date(createDate).toLocaleString("fi-FI")
              : "loading..."}
          </p>
          <p>
            {editDate
              ? "Last Modified: " + new Date(editDate).toLocaleString("fi-FI")
              : "loading..."}
          </p>
        </div>
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
