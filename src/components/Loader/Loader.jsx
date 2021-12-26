const Loader = (props) => {
    return (
      <div
        className="loader"
        style={{
          height: "100%",
          width: "100%",
          visibility: props.show,
          margin: "auto",
          alignSelf: "center",
          display: "flex",
          placeItems: "center",
          placeContent: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          className="spin"
          style={{
            borderBottom: `${props.borderWidth} solid transparent`,
            borderRight: `${props.borderWidth} solid transparent`,
            borderLeft: `${props.borderWidth} solid transparent`,
            borderTop: `${props.borderWidth} solid ${props.borderColor}`,
            height: props.height,
            width: props.width,
            borderRadius: "50%",
            background: props.bg,
            margin: props.margin,
            animation: props.animation,
          }}
        ></div>
      </div>
    );
}

export default Loader;