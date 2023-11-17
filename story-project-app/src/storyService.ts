import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const getStoryList = () => {
  const request = axios.get(`${serverUrl}/stories`);
  return request.then((response) => response.data).catch((err) => err);
};

const getStory = (id: string) => {
  const request = axios.get(`${serverUrl}/story/${id}`);
  return request.then((response) => response.data).catch((err) => err);
};

const getChapters = (id: string) => {
  const request = axios.get(`${serverUrl}/chapters/${id}`);
  return request.then((response) => response.data).catch((err) => err);
};

export default {
  getStory,
  getStoryList,
  getChapters,
};
