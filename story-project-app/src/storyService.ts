import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const getStoryList = () => {
  const request = axios.get(`${serverUrl}/stories`);
  return request.then((response) => response.data).catch((err) => err);
};

const getStoryByUrl = (url: string) => {
  const request = axios.get(`${serverUrl}/story/${url}`);
  return request.then((response) => response.data).catch((err) => err);
};

const getStoryIcon = (url: string) => {
  const request = axios.get(`${serverUrl}/story/${url}/icon`);
  return request.then((response) => response.data).catch((err) => err);
};

const getStoryChapter = (url: string, chapter: number) => {
  const request = axios.get(`${serverUrl}/story/${url}/${chapter}`);
  return request.then((response) => response.data).catch((err) => err);
};

const getChapterCount = (url: string) => {
  const request = axios.get(`${serverUrl}/count/${url}`);
  return request.then((response) => response.data).catch((err) => err);
};

export default {
  getStoryList,
  getStoryByUrl,
  getStoryIcon,
  getStoryChapter,
  getChapterCount,
};
