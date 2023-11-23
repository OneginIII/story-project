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

  const handleSetFont = (
    style: "font-original" | "font-modern" | "font-easy"
  ) => {
    if (updateTheme) {
      updateTheme({ ...theme, style: style });
    }
  };

  const handleSetSize = (
    size: "size-regular" | "size-small" | "size-large"
  ) => {
    if (updateTheme) {
      updateTheme({ ...theme, size: size });
    }
  };

  return (
    <div className="content settings">
      <p style={{ marginBottom: "0" }}>
        You can change the site's visual presentation here.
      </p>
      <p>Settings are saved in local storage.</p>
      <div className="setting-buttons">
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
      <div className="setting-buttons">
        <p>Font style:</p>
        <div>
          <button
            className={theme.style === "font-original" ? "selected" : ""}
            id="original"
            onClick={() => handleSetFont("font-original")}
          >
            Original
          </button>
          <button
            className={theme.style === "font-modern" ? "selected" : ""}
            id="modern"
            onClick={() => handleSetFont("font-modern")}
          >
            Modern
          </button>
          <button
            className={theme.style === "font-easy" ? "selected" : ""}
            id="easy"
            onClick={() => handleSetFont("font-easy")}
          >
            Easy to read
          </button>
        </div>
      </div>
      <div className="setting-buttons">
        <p>Text size:</p>
        <div>
          <button
            className={theme.size === "size-small" ? "selected" : ""}
            id="small"
            onClick={() => handleSetSize("size-small")}
          >
            Small
          </button>
          <button
            className={theme.size === "size-regular" ? "selected" : ""}
            id="regular"
            onClick={() => handleSetSize("size-regular")}
          >
            Regular
          </button>
          <button
            className={theme.size === "size-large" ? "selected" : ""}
            id="large"
            onClick={() => handleSetSize("size-large")}
          >
            Large
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
