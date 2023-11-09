import { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import LoginModal from "./LoginModal";
import Main from "./Main";

function App() {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  return (
    <div className="app">
      <div style={{ position: "absolute", left: "1em", top: "1em" }}>
        <label htmlFor="admin-toggle" style={{ textAlign: "center" }}>
          Admin toggle
        </label>
        <input
          id="admin-toggle"
          type="checkbox"
          checked={adminMode}
          onChange={() => setAdminMode(!adminMode)}
        />
      </div>
      <Header onAdmin={adminMode} />
      <Main onAdmin={adminMode} />
      <Footer onLogin={setDisplayLogin} onAdmin={adminMode} />
      {displayLogin && <LoginModal onClose={setDisplayLogin} />}
    </div>
  );
}

export default App;
