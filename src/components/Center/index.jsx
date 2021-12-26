const Center = ({children, size, margin}) => {
    return <div className="center" style={{
        height: "100%"
    }}>
        {children}
    </div>
}

export default Center;