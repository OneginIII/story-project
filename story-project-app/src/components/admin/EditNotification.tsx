import { useEffect, useState } from "react";

function EditNotification(props: {
  message: string;
  show?: boolean;
  hide?: boolean;
}) {
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    if (props.show) {
      show();
    }
  }, [props]);

  const show = () => {
    setAnimationActive(true);
  };

  const onAnimationEnd = () => {
    setAnimationActive(false);
  };

  return (
    <div
      className={
        "edit-notification" + (animationActive ? " animate-slide" : "")
      }
      onAnimationEnd={onAnimationEnd}
    >
      <p>{props.message}</p>
    </div>
  );
}

export default EditNotification;
