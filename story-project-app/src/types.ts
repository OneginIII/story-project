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

export interface IStoryLink {
  title: string;
  url: string;
  icon: string;
}
