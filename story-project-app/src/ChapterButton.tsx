import "./ChapterButton.css";

function ChapterButton(props: {
  text: string;
  selected: boolean;
  onChapterClick: (target: number) => void;
  targetChapter: number;
}) {
  return (
    <div
      onClick={() => props.onChapterClick(props.targetChapter)}
      className={
        props.selected ? "chapter-button selected-chapter" : "chapter-button"
      }
    >
      {props.text}
    </div>
  );
}

export default ChapterButton;
