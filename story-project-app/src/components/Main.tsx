import { useContext } from "react";
import Library from "./Library";
import "./Main.css";
import Menu from "./Menu";
import StaticContent from "./StaticContent";
import StoryContent from "./StoryContent";
import { pages, stories } from "../mockData";
import { AdminContext } from "../index";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

function Main() {
  const navigate = useNavigate();

  const admin = useContext(AdminContext);

  return (
    <main>
      <div className="sidebar">
        {!admin && <Menu pages={pages} />}
        <Library stories={stories} />
      </div>
      <Routes>
        {stories.map((story) => (
          <Route path={`/${story.url}`}>
            <Route
              path=":chapter"
              element={
                <StoryContent
                  story={story}
                  setCurrentChapter={(val: number) =>
                    navigate(`/${story.url}/` + String(val + 1))
                  }
                />
              }
            />
          </Route>
        ))}
        {pages.map((page) => (
          <Route
            path={`/${page.title.toLocaleLowerCase()}`}
            element={<StaticContent title={page.title} text={page.text} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default Main;
