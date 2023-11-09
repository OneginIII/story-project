import "./Header.css";

function Header(props: { onAdmin: boolean }) {
  return (
    <header>
      {props.onAdmin && <h3>Admin mode</h3>}
      <h1>Story Project</h1>
    </header>
  );
}

export default Header;
