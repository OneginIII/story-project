import "./Menu.css";
import { Page } from "./mockData";

function Menu(props: {
  pages: Page[];
  currentPage: string;
  onClickMenu: (page: string) => void;
}) {
  return (
    <div className="menu">
      {props.pages.map((page) => (
        <div
          key={page.title}
          className={
            props.currentPage === page.title
              ? "box box-button menu-selected"
              : "box box-button"
          }
          onClick={() => props.onClickMenu(page.title)}
        >
          <p>{page.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Menu;
