import {NavBrand} from "../../components";

const Nav = ({justify, children}) => {
    return <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: justify
    }} className="nav">
        <NavBrand size="1rem"/>
        {children}
    </nav>
}

export default Nav;