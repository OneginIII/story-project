import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../loginService";

function Header() {
  const auth = useAuth();
  return (
    <header>
      {auth?.token && <h3>Admin mode</h3>}
      <Link to={"/"}>
        <h1>Story Project</h1>
      </Link>
    </header>
  );
}

export default Header;
