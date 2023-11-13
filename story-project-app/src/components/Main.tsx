import React from "react";
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

// Temp default page
const initialPage = pages[0];

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
          // Have to use React.Fragment here to access key property.
          <React.Fragment key={story.id}>
            <Route path={`/${story.url}`}>
              <Route
                path=":chapter?"
                element={
                  <StoryContent
                    story={story}
                    setCurrentChapter={(val: number) => {
                      if (story.chapters[val]) {
                        navigate(`/${story.url}/` + String(val + 1));
                      }
                    }}
                  />
                }
              />
            </Route>
          </React.Fragment>
        ))}
        {pages.map((page) => (
          <Route
            key={page.title}
            path={`/${page.title.toLocaleLowerCase()}`}
            element={<StaticContent title={page.title} text={page.text} />}
          />
        ))}
        <Route
          path="/"
          element={
            <StaticContent title={initialPage.title} text={initialPage.text} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default Main;
