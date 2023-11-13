import "../Modal.css";

function DeleteModal(props: { toDeleteText: string; onClose: () => void }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h3>Are you sure you want to delete the {props.toDeleteText}?</h3>
      <div className="horizontal-buttons">
        <button type="submit" className="btn-danger">
          Delete
        </button>
        <button onClick={() => props.onClose()}>Cancel</button>
      </div>
    </form>
  );
}

export default DeleteModal;
