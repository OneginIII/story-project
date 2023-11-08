function StaticContent(props: { title: string; text: string }) {
  return (
    <div className="content">
      <div className="content-title">
        <h2>{props.title}</h2>
      </div>
      <div className="content-body">
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default StaticContent;
