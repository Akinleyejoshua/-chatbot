import Loader from "../Loader/Loader";

const ButtonLoader = ({ value, loader, lSize, lColor, ...props }) => {
  return (
    <button
      className="custom-btn"
      style={{
        color: props.color,
        backgroundColor: props.bg,
        padding: props.padding,
        // border: "none",
        borderRadius: props.radius,
        margin: props.margin,
        border: props.border,
        width: props.width,
      }}
      onClick={props.onClick}
    >
      {loader ? (
          <Loader
            width={lSize}
            height={lSize}
            borderWidth="2px"
            borderColor={lColor}
            bg="none"
            animation="2s spinLoader infinite linear"
            margin="auto"
          />
      ) : (
        value
      )}
    </button>
  );
};

export default ButtonLoader;
