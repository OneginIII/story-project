import { useContext } from "react";
import { AdminContext } from "../index";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const admin = useContext(AdminContext);
  return (
    <header>
      {admin && <h3>Admin mode</h3>}
      <Link to={"/"}>
        <h1>Story Project</h1>
      </Link>
    </header>
  );
}

export default Header;
