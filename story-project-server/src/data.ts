export interface IStory {
  id: string;
  created_by: string;
  title: string;
  icon: string;
  url: string;
  visible: boolean;
  created_at: string;
  modified_at: string;
}

export function isStory(story: unknown): story is IStory {
  if (
    typeof (story as IStory)["id"] === "string" &&
    typeof (story as IStory)["created_by"] === "string" &&
    typeof (story as IStory)["title"] === "string" &&
    typeof (story as IStory)["icon"] === "string" &&
    typeof (story as IStory)["url"] === "string" &&
    typeof (story as IStory)["visible"] === "boolean" &&
    typeof (story as IStory)["created_at"] === "string" &&
    typeof (story as IStory)["modified_at"] === "string"
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
    typeof (chapter as IChapter)["text"] === "string"
  ) {
    return true;
  }
  return false;
}
