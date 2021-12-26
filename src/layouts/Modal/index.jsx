const Modal = ({ show, ...props }) => {
  return <>{show && <div className="modal">{props.children}</div>}</>;
};

export default Modal;
