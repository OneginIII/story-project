import "./Footer.css";
import { Link } from "react-router-dom";
import { useAuth } from "../loginService";

function Footer(props: { onLogin?: (on: boolean) => void }) {
  const auth = useAuth();
  return (
    <footer>
      <p>
        {auth?.token ? (
          <Link onClick={() => auth.onLogout()} to="/">
            Log out
          </Link>
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
