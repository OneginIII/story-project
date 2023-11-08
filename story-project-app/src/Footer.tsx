import "./Footer.css";

function Footer(props: { onLogin: (on: boolean) => void; onAdmin: boolean }) {
  return (
    <footer>
      <p>
        {props.onAdmin ? (
          <a href="#">Log out</a>
        ) : (
          <a href="#" onClick={() => props.onLogin(true)}>
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
