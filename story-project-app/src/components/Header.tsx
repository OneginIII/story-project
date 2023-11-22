import { useContext } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../loginService";
import { AdminContext } from "..";

function Header() {
  const auth = useAuth();
  const admin = useContext(AdminContext);
  const location = useLocation();
  return (
    <header>
      {auth?.token && <h3>Admin mode</h3>}
      <Link
        to={
          auth?.token
            ? location.pathname.includes("/admin") && admin
              ? "/"
              : "/admin"
            : "/"
        }
      >
        <h1>Story Project</h1>
      </Link>
    </header>
  );
}

export default Header;
