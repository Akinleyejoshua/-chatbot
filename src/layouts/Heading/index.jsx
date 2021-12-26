const Heading = ({main, sub, p, m}) => {
    return <div className="heading" style={{
        padding: p,
        margin: m,
        textAlign: "center"
    }}>
        <h3>{main}</h3>
        <p style={{
            color: "var(--black)"
        }}>{sub}</p>
    </div>
}

export default Heading;