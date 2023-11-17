export interface IStory {
  id: string;
  created_by?: string;
  title: string;
  icon: string;
  url: string;
  visible: boolean;
  created_at?: string;
  modified_at?: string;
}

export interface IChapter {
  id: string;
  story_id?: string;
  number?: number;
  title: string;
  text: string;
  created_at?: string;
  modified_at?: string;
}
