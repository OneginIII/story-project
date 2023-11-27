import axios from "axios";
import { IChapter, IStory } from "./types";

const serverUrl = import.meta.env.VITE_SERVER_URL + "/admin";

// Authenticate
const config = {
  headers: {
    token: "",
  },
};

const setToken = (token: string) => {
  config.headers.token = "bearer " + token;
};

// Story
const updateStory = (id: string, story: IStory) => {
  const request = axios
    .put(`${serverUrl}/story/${id}`, story, config)
    .catch((reason) => console.error(reason));
  return request
    .then((response) => response)
    .catch((reason) => console.error(reason));
};

const createStory = (story: IStory) => {
  const request = axios.post(`${serverUrl}/story`, story, config);
  return request
    .then((response) => response)
    .catch((reason) => console.error(reason));
};

const deleteStory = (id: string) => {
  const request = axios.delete(`${serverUrl}/story/${id}`, config);
  return request
    .then((response) => response)
    .catch((reason) => console.error(reason));
};

const uploadIcon = (id: string, icon: File) => {
  const formData = new FormData();
  formData.append("icon", icon);
  const uploadConfig = {
    headers: { ...config.headers, "content-type": "multipart/form-data" },
  };
  const request = axios.post(
    `${serverUrl}/story/${id}/icon`,
    formData,
    uploadConfig
  );
  return request
    .then((response) => response)
    .catch((reason) => console.error(reason));
};

const deleteIcon = (path: string) => {
  const pathSubstrings = path.split("/");
  const request = axios.delete(
    `${serverUrl}/icon/${pathSubstrings[pathSubstrings.length - 1]}`,
    config
  );
  return request
    .then((response) => response)
    .catch((reason) => console.error(reason));
};

// Chapter
const updateChapter = (id: string, chapter: IChapter) => {
  const request = axios.put(`${serverUrl}/chapters/${id}`, chapter, config);
  return request
    .then((response) => response)
    .catch((reason) => console.error(reason));
};

const createChapter = (id: string, chapter: IChapter) => {
  const request = axios.post(`${serverUrl}/chapters/${id}`, chapter, config);
  return request
    .then((response) => response)
    .catch((reason) => console.error(reason));
};

const deleteChapter = (id: string) => {
  const request = axios.delete(`${serverUrl}/chapters/${id}`, config);
  return request
    .then((response) => response)
    .catch((reason) => console.error(reason));
};

export default {
  updateChapter,
  deleteChapter,
  createChapter,
  updateStory,
  createStory,
  deleteStory,
  uploadIcon,
  deleteIcon,
  setToken,
};
