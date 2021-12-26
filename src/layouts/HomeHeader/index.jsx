import { useSelector } from "react-redux";
import { Nav } from "..";
import { ImgName } from "../../components";
import { useHistory } from "react-router";

const HomeHeader = ({data}) => {
    const home = useSelector(state => state.home);
    const history = useHistory();

    return <header className="home-header">
        <Nav justify="space-between" children={
            <div className="navbar-info">
                <ImgName value={home.username} bg="var(--lightred)" color="white" size="2.5rem" border="1px solid" action={() => history.push(`/@${home.username}`)}/>
                <div className="info col">
                    <h3>{home.email}</h3>
                    <p>{home.department} Department</p>
                </div>
            </div>
        }/>
    </header>
}

export default HomeHeader;