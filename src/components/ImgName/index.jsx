const ImgName = ({value, color, bg, border, size, action}) => {
    const firstLetter = value.charAt(0);


    return <div className="img-name" onClick={action} style={{
        borderRadius: "50%",
        background: bg,
        color: color,
        border: border,
        height: size,
        width: size,
        display: "flex",
        placeItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontWeight: "bold"
    }}>
        {firstLetter}
    </div>
}

export default ImgName;