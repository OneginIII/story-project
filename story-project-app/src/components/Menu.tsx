import "./Menu.css";
import { Page } from "../mockData";
import { NavLink } from "react-router-dom";

function Menu(props: { pages: Page[] }) {
  return (
    <div className="menu">
      {props.pages.map((page) => (
        <NavLink
          to={`/${page.title.toLowerCase()}/`}
          key={page.title}
          className={"box box-button"}
        >
          {page.title}
        </NavLink>
      ))}
    </div>
  );
}

export default Menu;
