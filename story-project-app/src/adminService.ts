import axios from "axios";
import { IChapter, IStory } from "./types";

const serverUrl = import.meta.env.VITE_SERVER_URL + "/admin";

// Chapter
const updateChapter = (
  id: string,
  chapterNumber: number,
  chapter: IChapter
) => {
  const request = axios.put(`${serverUrl}/${id}/${chapterNumber}`, chapter);
  return request.then((response) => response);
};

const createChapter = (id: string, chapter: IChapter) => {
  const request = axios.post(`${serverUrl}/${id}/new`, chapter);
  return request.then((response) => response);
};

const deleteChapter = (id: string, chapterNumber: number) => {
  const request = axios.delete(`${serverUrl}/${id}/${chapterNumber}`);
  return request.then((response) => response);
};

// Story
const updateStory = (id: string, story: IStory) => {
  const request = axios.put(`${serverUrl}/${id}`, story);
  return request.then((request) => request);
};

const createStory = (story: IStory) => {
  const request = axios.post(`${serverUrl}/new`, story);
  return request.then((request) => request);
};

const deleteStory = (id: string) => {
  const request = axios.delete(`${serverUrl}/${id}`);
  return request.then((request) => request);
};

export default {
  updateChapter,
  deleteChapter,
  createChapter,
  updateStory,
  createStory,
  deleteStory,
};
