import { useEffect, useState } from "react";
import pageService from "../pageService";
import Markdown from "marked-react";
import Loading from "./Loading";

function StaticContent(props: { name: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    pageService
      .getPageContent(props.name)
      .then((serverContent) => {
        setContent(serverContent);
      })
      .finally(() => setLoading(false));
  }, [content, props.name]);

  return (
    <div className="markdown-content">
      <Markdown>{content}</Markdown>
      {loading && <Loading />}
    </div>
  );
}

export default StaticContent;
