import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import { useAuth } from "../loginService";

function LoginModal(props: { onSuccesfulLogin: () => void }) {
  const auth = useAuth();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [success, setSuccess] = useState<"initial" | "success" | "failure">(
    "initial"
  );
  const [loginMessage, setLoginMessage] = useState("Login to continue");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await auth?.onLogin(inputs.username, inputs.password);
    if (result && result[0]) {
      setSuccess("success");
      props.onSuccesfulLogin();
    } else if (result) {
      setSuccess("failure");
      if (typeof result[1] === "string") {
        setLoginMessage(result[1]);
      }
    }
  };

  const handleRegister = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const result = await auth?.onRegister(inputs.username, inputs.password);
    if (result && result[0]) {
      setSuccess("success");
      if (typeof result[1] === "string") {
        setLoginMessage(result[1]);
      }
    } else if (result) {
      setSuccess("failure");
      if (typeof result[1] === "string") {
        setLoginMessage(result[1]);
      }
    }
  };

  const messageColor = (success: "initial" | "success" | "failure") => {
    if (success === "initial") {
      return "inherit";
    } else if (success === "success") {
      return "#33E633";
    } else if (success === "failure") {
      return "#E63333";
    }
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
      <div style={{ color: messageColor(success) }}>
        <p className="login-message">{loginMessage}</p>
      </div>
    </form>
  );
}

export default LoginModal;
