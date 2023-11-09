import "./Modal.css";

function LoginModal(props: { onClose: (on: boolean) => void }) {
  return (
    <div className="modal" onClick={() => props.onClose(false)}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <form>
          <label htmlFor="username">Username</label>
          <input name="username" id="username" type="text"></input>
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password"></input>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
