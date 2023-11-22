import { useContext } from "react";
import "./Content.css";
import "./Settings.css";
import { ThemeContext } from "./ThemeProvider";

function Settings() {
  const { theme, updateTheme } = useContext(ThemeContext);

  const handleSetTheme = (color: "theme-dark" | "theme-light") => {
    if (updateTheme) {
      updateTheme({ ...theme, colors: color });
    }
  };

  return (
    <div className="content settings">
      <p>Settings will eventually go here.</p>
      <div id="theme-buttons" className="theme-buttons">
        <p>Theme:</p>
        <div>
          <button
            className={theme.colors === "theme-dark" ? "selected" : ""}
            id="dark-button"
            onClick={() => handleSetTheme("theme-dark")}
          >
            Dark
          </button>
          <button
            className={theme.colors === "theme-light" ? "selected" : ""}
            id="light-button"
            onClick={() => handleSetTheme("theme-light")}
          >
            Light
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
