import { useEffect, useState } from "react";
import pageService from "../pageService";
import Markdown from "marked-react";

function StaticContent(props: { name: string }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    pageService.getPageContent(props.name).then((serverContent) => {
      setContent(serverContent);
    });
  }, [content, props.name]);

  return (
    <div className="markdown-content">
      <Markdown>{content}</Markdown>
    </div>
  );
}

export default StaticContent;
