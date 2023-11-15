import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Modal from "./components/Modal";
import "./components/Modal.css";
import LoginModal from "./components/LoginModal";
import { useNavigate } from "react-router-dom";

export const homePage = "Home";

function App() {
  const navigate = useNavigate();
  const [displayLogin, setDisplayLogin] = useState(false);

  return (
    <div className="app">
      <Header />
      <Main />
      <Modal isOpen={displayLogin} onClose={() => setDisplayLogin(false)}>
        <LoginModal onSubmit={() => navigate("admin")} />
      </Modal>
      <Footer onLogin={setDisplayLogin} />
    </div>
  );
}

export default App;
