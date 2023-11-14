import "./Menu.css";
import { NavLink } from "react-router-dom";
import pageService from "../pageService";
import { useEffect, useState } from "react";

function Menu() {
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    pageService.getPageList().then((serverPages) => {
      setPages(serverPages.reverse().map((page: string) => page.split(".")[0]));
    });
  }, []);

  return (
    <div className="menu">
      {pages.map((page) => (
        <NavLink
          to={`/${page.toLowerCase()}/`}
          key={page}
          className={"box box-button"}
        >
          {page}
        </NavLink>
      ))}
      <NavLink
        to={"/settings/"}
        className={"box box-button"}
        style={{ flex: "0 1", padding: "0.75em" }}
      >
        {settingsIcon}
      </NavLink>
    </div>
  );
}

const settingsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M10.125 22q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.15-.7.038t-.55-.438L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.2-.325.55-.438t.7.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.15.7-.038t.55.438L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.45t-.712-.025l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25h-3.75Zm1.925-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z"
    />
  </svg>
);

export default Menu;
