const Welcome = (props) => {
    return (
        <button className="custom-btn" style={{
            color: props.color,
            backgroundColor: props.bg,
            padding: props.padding,
            // border: "none",
            borderRadius: props.radius,
            margin: props.margin,
            border: props.border,
        }}
        onClick={props.onClick}
        >

            <>{props.value}</>
            {/* {props.value} */}
            
        </button>
    );
}

export default Welcome;