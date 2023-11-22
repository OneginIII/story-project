import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Modal from "./components/Modal";
import "./components/Modal.css";
import LoginModal from "./components/LoginModal";
import { useLocation, useNavigate } from "react-router-dom";
import loginService, { useAuth } from "./loginService";

export const homePage = "Home";

function App() {
  const [displayLogin, setDisplayLogin] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
    const verify = async () => {
      if (location.pathname.includes("/admin")) {
        const response = await loginService.verify(
          typeof auth?.token === "string" ? auth?.token : ""
        );
        if (response instanceof Error) {
          navigate("/");
        }
      }
    };
    verify();
  }, [auth?.token, navigate, location.pathname]);

  return (
    <div className="app">
      <Header />
      <Main />
      <Modal isOpen={displayLogin} onClose={() => setDisplayLogin(false)}>
        <LoginModal onSuccesfulLogin={() => setDisplayLogin(false)} />
      </Modal>
      <Footer onLogin={setDisplayLogin} />
    </div>
  );
}

export default App;
