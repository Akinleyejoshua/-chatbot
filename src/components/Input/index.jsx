import { Toast } from "../";

const Input = ({id, err, errMsg, type, placeholder, onChange, styles, margin }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      margin: margin
    }} className="input-bar">
      <input
        style={styles}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
      />
        <Toast show={err && true} text={errMsg} />
    </div>
  );
};

export default Input;
