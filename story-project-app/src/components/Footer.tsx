import { useContext } from "react";
import { AdminContext } from "../index";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer(props: { onLogin?: (on: boolean) => void }) {
  const admin = useContext(AdminContext);
  return (
    <footer>
      <p>
        {admin ? (
          <Link to="/">Log out</Link>
        ) : (
          <a
            className="link"
            onClick={() => {
              if (props.onLogin) {
                props.onLogin(true);
              }
            }}
          >
            Log in
          </a>
        )}
      </p>
      <p>|</p>
      <p>© 2023 Tero Salmela</p>
    </footer>
  );
}

export default Footer;
