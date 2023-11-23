import { createContext, useEffect, useState } from "react";

type ThemeColor = "theme-dark" | "theme-light";
type FontStyle = "font-original" | "font-modern" | "font-easy";
type TextSize = "size-regular" | "size-small" | "size-large";

interface ITheme {
  colors: ThemeColor;
  style: FontStyle;
  size: TextSize;
}

interface IThemeContext {
  theme: ITheme;
  updateTheme?: (theme: ITheme) => undefined | void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: {
    colors: "theme-dark",
    style: "font-original",
    size: "size-regular",
  },
});

const preventInitialTransition = () => {
  const normalTransition =
    document.documentElement.style.getPropertyValue("--theme-transition");
  document.documentElement.style.setProperty("--theme-transition", "0");
  console.log(normalTransition);
  setTimeout(() => {
    document.documentElement.style.setProperty(
      "--theme-transition",
      normalTransition
    );
  }, 1000);
};
preventInitialTransition();

function ThemeProvider(props: { children: React.ReactNode }) {
  const checkInitialTheme = () => {
    const colorTheme = localStorage.getItem("color-theme") as ThemeColor;
    if (colorTheme) {
      return colorTheme;
    } else {
      const browserTheme = window.matchMedia("(prefers-color-scheme: light)");
      if (browserTheme.matches) {
        return "theme-light";
      } else {
        return "theme-dark";
      }
    }
  };

  const checkInitialFont = () => {
    const fontStyle = localStorage.getItem("font-style") as FontStyle;
    if (fontStyle) {
      return fontStyle;
    } else {
      return "font-original";
    }
  };

  const checkInitialSize = () => {
    const textSize = localStorage.getItem("text-size") as TextSize;
    if (textSize) {
      return textSize;
    } else {
      return "size-regular";
    }
  };

  const [theme, setTheme] = useState<ITheme>({
    colors: checkInitialTheme(),
    style: checkInitialFont(),
    size: checkInitialSize(),
  });

  const handleSetTheme = (theme: ITheme): undefined => {
    setTheme(theme);
    localStorage.setItem("color-theme", theme.colors);
    localStorage.setItem("font-style", theme.style);
    localStorage.setItem("text-size", theme.size);
  };

  useEffect(() => {
    if (theme.colors === "theme-light") {
      document.documentElement.classList.add("light");
    } else if (theme.colors === "theme-dark") {
      document.documentElement.classList.remove("light");
    }
    switch (theme.style) {
      case "font-original":
        document.documentElement.classList.remove("font-modern");
        document.documentElement.classList.remove("font-easy");
        break;
      case "font-modern":
        document.documentElement.classList.add("font-modern");
        document.documentElement.classList.remove("font-easy");
        break;
      case "font-easy":
        document.documentElement.classList.add("font-easy");
        document.documentElement.classList.remove("font-modern");
        break;
      default:
        break;
    }
    switch (theme.size) {
      case "size-regular":
        document.documentElement.classList.remove("text-small");
        document.documentElement.classList.remove("text-large");
        break;
      case "size-small":
        document.documentElement.classList.add("text-small");
        document.documentElement.classList.remove("text-large");
        break;
      case "size-large":
        document.documentElement.classList.add("text-large");
        document.documentElement.classList.remove("text-small");
        break;
      default:
        break;
    }
  }, [theme]);

  const value: IThemeContext = {
    theme: theme,
    updateTheme: handleSetTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
