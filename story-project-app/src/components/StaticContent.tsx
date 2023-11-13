function StaticContent(props: { title: string; text: string }) {
  return (
    <div className="content">
      <h2>{props.title}</h2>
      <div className="content-body">
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default StaticContent;
