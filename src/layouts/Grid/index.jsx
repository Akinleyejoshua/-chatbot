const Grid = ({min, gap, ...props}) => {
    return <div className="grid" style={{
        display: "grid",
        // gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))`,
        gridGap: gap,
    }}>
        {props.children}
    </div>
}

export default Grid;