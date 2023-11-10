import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Modal from "./components/Modal";
import "./components/Modal.css";
import LoginModal from "./components/LoginModal";

function App() {
  const [displayLogin, setDisplayLogin] = useState(false);

  return (
    <div className="app">
      <Header />
      <Main />
      <Modal isOpen={displayLogin} onClose={() => setDisplayLogin(false)}>
        <LoginModal onSubmit={(e) => e.preventDefault()} />
      </Modal>
      <Footer onLogin={setDisplayLogin} />
    </div>
  );
}

export default App;
