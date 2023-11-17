import axios from "axios";
import { IChapter, IStory } from "./types";

const serverUrl = import.meta.env.VITE_SERVER_URL + "/admin";

// Story
const updateStory = (id: string, story: IStory) => {
  const request = axios.put(`${serverUrl}/story/${id}`, story);
  return request.then((request) => request);
};

const createStory = (story: IStory) => {
  const request = axios.post(`${serverUrl}/story`, story);
  return request.then((request) => request);
};

const deleteStory = (id: string) => {
  const request = axios.delete(`${serverUrl}/story/${id}`);
  return request.then((request) => request);
};

// Chapter
const updateChapter = (id: string, chapter: IChapter) => {
  const request = axios.put(`${serverUrl}/chapters/${id}`, chapter);
  return request.then((response) => response);
};

const createChapter = (id: string, chapter: IChapter) => {
  const request = axios.post(`${serverUrl}/chapters/${id}`, chapter);
  return request.then((response) => response);
};

const deleteChapter = (id: string) => {
  const request = axios.delete(`${serverUrl}/chapters/${id}`);
  return request.then((response) => response);
};

export default {
  updateChapter,
  deleteChapter,
  createChapter,
  updateStory,
  createStory,
  deleteStory,
};
