function LoginModal(props: { onSubmit: (event: React.FormEvent) => void }) {
  return (
    <form onSubmit={props.onSubmit}>
      <label htmlFor="username">Username</label>
      <input autoFocus name="username" id="username" type="text"></input>
      <label htmlFor="password">Password</label>
      <input name="password" id="password" type="password"></input>
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginModal;
