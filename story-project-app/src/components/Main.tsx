import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Library from "./Library";
import "./Main.css";
import Menu from "./Menu";
import StaticContent from "./StaticContent";
import StoryContent from "./StoryContent";
import { AdminContext } from "../index";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";
import ChapterEdit from "./admin/ChapterEdit";
import StoryEdit from "./admin/StoryEdit";
import pageService from "../pageService";
import Settings from "./Settings";
import { homePage } from "../App";
import Admin from "./Admin";
import { IStory } from "../types";
import storyService from "../storyService";

function Main() {
  const [pages, setPages] = useState<string[]>([]);
  const [stories, setStories] = useState<IStory[]>([]);

  useEffect(() => {
    pageService.getPageList().then((serverPages) => {
      setPages(serverPages.reverse().map((page: string) => page.split(".")[0]));
    });
  }, []);

  useEffect(() => {
    refreshStories();
  }, []);

  const refreshStories = () => {
    storyService.getStoryList().then((serverStories) => {
      setStories(serverStories);
    });
  };

  const navigate = useNavigate();
  const admin = useContext(AdminContext);

  return (
    <main>
      <div className="sidebar">
        {!admin && <Menu />}
        <Library stories={stories} />
      </div>
      <Routes>
        {stories.map((story) => (
          // Have to use React.Fragment here to access key property.
          <React.Fragment key={story.url}>
            <Route path={`/${story.url}`}>
              <Route
                path=":chapter?"
                element={
                  admin ? (
                    <ChapterEdit id={story.id} />
                  ) : (
                    <StoryContent id={story.id} />
                  )
                }
              />
              {admin && (
                <Route
                  path="new"
                  element={<ChapterEdit id={story.url} new />}
                />
              )}
            </Route>
            {admin && (
              <>
                <Route
                  path={`edit/${story.url}`}
                  element={
                    <StoryEdit
                      id={story.id}
                      onChapterEdit={() => navigate(-1)}
                      refreshStories={refreshStories}
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
                id=""
                onChapterEdit={() => null}
                new
                refreshStories={refreshStories}
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
