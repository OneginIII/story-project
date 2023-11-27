import { validate as uuidValidate } from "uuid";

export interface IStory {
  id: string;
  title: string;
  icon: string;
  url: string;
  visible: boolean;
  created_by?: string;
  created_at?: string;
  modified_at?: string;
}

export function isStory(story: unknown): story is IStory {
  if (
    typeof (story as IStory)["id"] === "string" &&
    uuidValidate((story as IStory)["id"]) &&
    typeof (story as IStory)["title"] === "string" &&
    (story as IStory)["title"].length <= 100 &&
    typeof (story as IStory)["icon"] === "string" &&
    isValidPath((story as IStory)["icon"]) &&
    typeof (story as IStory)["url"] === "string" &&
    (story as IStory)["url"].length <= 100 &&
    isValidUrl((story as IStory)["url"]) &&
    typeof (story as IStory)["visible"] === "boolean"
  ) {
    return true;
  }
  return false;
}
export interface IChapter {
  title: string;
  text: string;
}

export function isChapter(chapter: unknown): chapter is IChapter {
  if (
    typeof (chapter as IChapter)["title"] === "string" &&
    (chapter as IChapter)["title"].length <= 100 &&
    typeof (chapter as IChapter)["text"] === "string"
  ) {
    return true;
  }
  return false;
}

function isValidUrl(url: string) {
  if (url === "new") {
    return false;
  }
  console.log(url.match(/[-a-z0-9]/g));
  if (url.match(/[-a-z0-9]+/g)?.length === 1) {
    return true;
  } else return false;
}

function isValidPath(path: string) {
  if (path === "") return true;
  if (path.match(/[-a-z0-9/.]+/gi)?.length === 1) {
    return true;
  } else return false;
}
