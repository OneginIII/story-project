import { createContext, useState } from "react";

type ThemeColor = "theme-dark" | "theme-light";
type FontStyle = "font-normal" | "font-sans" | "font-dyslexia";
type TextSize = "size-normal" | "size-small" | "size-large";

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
    style: "font-normal",
    size: "size-normal",
  },
});

function ThemeProvider(props: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ITheme>({
    colors: "theme-light",
    style: "font-normal",
    size: "size-normal",
  });

  const handleSetTheme = (theme: ITheme): undefined => {
    setTheme(theme);
  };

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
