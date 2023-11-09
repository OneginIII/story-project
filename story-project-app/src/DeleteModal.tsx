import "./Modal.css";

function DeleteModal(props: {
  toDeleteText: string;
  onClose: (show: boolean) => void;
}) {
  return (
    <div className="modal" onClick={() => props.onClose(false)}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <h3>Are you sure you want to delete the {props.toDeleteText}?</h3>
        <div className="horizontal-buttons">
          <button className="btn-danger">Delete</button>
          <button onClick={() => props.onClose(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
