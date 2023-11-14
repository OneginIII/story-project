import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const getPageList = () => {
  const request = axios.get(`${serverUrl}/pages`);
  return request.then((response) => response.data).catch((err) => err);
};

const getPageContent = (name: string) => {
  const request = axios.get(`${serverUrl}/page/${name}`);
  return request.then((response) => response.data).catch((err) => err);
};

export default { getPageList, getPageContent };
