import {Nav} from "../";

 const Header = ({children}) => {
    return (
        <header className="header">
            <Nav justify="space-between" children={children}/>
        </header>
    )
}

export default Header;