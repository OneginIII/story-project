import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import loginService, { useAuth } from "../loginService";

function LoginModal(props: { onSuccesfulLogin: () => void }) {
  const auth = useAuth();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loginFailed, setLoginFailed] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const loginResult = await auth?.onLogin(inputs.username, inputs.password);
    if (loginResult) {
      props.onSuccesfulLogin();
    }
    setLoginFailed(!loginResult);
  };

  const handleRegister = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    loginService.register(inputs.username, inputs.password);
    setRegistered(true);
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <label htmlFor="username">Username</label>
      <input
        autoFocus
        name="username"
        id="username"
        type="text"
        value={inputs.username || ""}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        id="password"
        type="password"
        value={inputs.password || ""}
        onChange={handleChange}
      />
      <div className="horizontal-buttons">
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <button type="submit">Log in</button>
      </div>
      {loginFailed && (
        <p style={{ color: "#E63333", textAlign: "center" }}>Login failed!</p>
      )}
      {registered && (
        <p style={{ color: "#33E633", textAlign: "center" }}>
          User registered!
        </p>
      )}
    </form>
  );
}

export default LoginModal;
