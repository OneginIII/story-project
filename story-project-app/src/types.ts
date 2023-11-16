export interface IStory {
  id: string;
  title: string;
  chapters: IChapter[];
  url: string;
  visible: boolean;
  dateCreated: Date;
  icon: string;
}

export interface IChapter {
  title: string;
  text: string;
}

export interface IDBStory {
  id: string;
  created_by: string;
  title: string;
  icon: string;
  url: string;
  visible: boolean;
  created_at: string;
  modified_at: string;
}

export interface IDBChapter {
  id: string;
  story_id: string;
  number: number;
  title: string;
  text: string;
  created_at: string;
  modified_at: string;
}
