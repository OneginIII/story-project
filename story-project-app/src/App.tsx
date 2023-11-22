import { useEffect, useState, useContext } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Modal from "./components/Modal";
import "./components/Modal.css";
import LoginModal from "./components/LoginModal";
import { useLocation, useNavigate } from "react-router-dom";
import loginService, { useAuth } from "./loginService";
import { ThemeContext } from "./components/ThemeProvider";

export const homePage = "Home";

function App() {
  const [displayLogin, setDisplayLogin] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

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
    <div className={`app ${theme.colors} ${theme.style} ${theme.size}`}>
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
