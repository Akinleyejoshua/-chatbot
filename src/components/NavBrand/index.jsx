const NavBrand = ({size}) => {
    return <div className="navbar">
        <a href="/">
        <span style={{
            fontSize: size,
            color: "var(--lightred)"
        }} className=""><i className="fa fa-shopping-cart" style={{
            marginRight: ".5rem"
        }}></i>Gtext Products</span>
        </a>

    </div>
}

export default NavBrand