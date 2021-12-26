const Toast = ({text, show, type, style}) => {
    const styles = {
        danger: {
            color: "var(--lightred)"
        },
        success: {
            color: "var(--green)"
        }
    }
    return <div className={show ? "toast open" : "toast"} style={style} id={type === "success" ? "toast success" : ""}>
        <p style={type === "success" ? styles.success : styles.danger}>{show && text}</p>
    </div>
}

export default Toast;