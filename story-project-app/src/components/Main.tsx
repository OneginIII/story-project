import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Library from "./Library";
import "./Main.css";
import Menu from "./Menu";
import StaticContent from "./StaticContent";
import StoryContent from "./StoryContent";
import { stories } from "../mockData";
import { AdminContext } from "../index";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";
import ChapterEdit from "./admin/ChapterEdit";
import StoryEdit from "./admin/StoryEdit";
import pageService from "../pageService";
import Settings from "./Settings";
import { homePage } from "../App";
import Admin from "./Admin";

function Main() {
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    pageService.getPageList().then((serverPages) => {
      setPages(serverPages.reverse().map((page: string) => page.split(".")[0]));
    });
  }, []);

  const navigate = useNavigate();
  const admin = useContext(AdminContext);

  return (
    <main>
      <div className="sidebar">
        {!admin && <Menu />}
        <Library />
      </div>
      <Routes>
        {stories.map((story) => (
          // Have to use React.Fragment here to access key property.
          <React.Fragment key={story.id}>
            <Route path={`/${story.url}`}>
              <Route
                path=":chapter?"
                element={
                  admin ? (
                    <ChapterEdit
                      story={story}
                      setCurrentChapter={(val: number) => {
                        if (story.chapters[val]) {
                          navigate(`${story.url}/` + String(val + 1));
                        }
                      }}
                      onEditStory={() => navigate(`edit/${story.id}`)}
                    />
                  ) : (
                    <StoryContent
                      story={story}
                      setCurrentChapter={(val: number) => {
                        if (story.chapters[val]) {
                          navigate(`${story.url}/` + String(val + 1));
                        }
                      }}
                    />
                  )
                }
              />
              {admin && (
                <Route
                  path="new"
                  element={
                    <ChapterEdit
                      story={story}
                      setCurrentChapter={(val: number) => {
                        if (story.chapters[val]) {
                          navigate(`${story.url}/` + String(val + 1));
                        }
                      }}
                      onEditStory={() => navigate(`edit/${story.id}`)}
                      new
                    />
                  }
                />
              )}
            </Route>
            {admin && (
              <>
                <Route
                  path={`edit/${story.id}`}
                  element={
                    <StoryEdit
                      story={story}
                      onChapterEdit={() => navigate(-1)}
                    />
                  }
                />
              </>
            )}
          </React.Fragment>
        ))}
        {pages.map((page) => (
          <Route
            key={page}
            path={`/${page.toLocaleLowerCase()}`}
            element={<StaticContent name={page} />}
          />
        ))}
        <Route path="settings" element={<Settings />} />
        {admin && (
          <Route
            path="new"
            element={
              <StoryEdit
                story={{
                  title: "",
                  id: "",
                  chapters: [],
                  dateCreated: new Date(),
                  icon: "",
                  url: "",
                  visible: false,
                }}
                onChapterEdit={() => null}
                new
              />
            }
          />
        )}
        {admin ? (
          <Route path="/" element={<Admin />} />
        ) : (
          <Route path="/" element={<StaticContent name={homePage} />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default Main;
