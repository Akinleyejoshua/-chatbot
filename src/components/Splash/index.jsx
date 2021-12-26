import {Loader} from "..";

const Splash = ({loading}) => {
    return loading && <div className="splash-loader" style={{
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "white",
        position: "fixed",
        height: "100vh",
        width: "100%",
        zIndex: "1000"
    }}>
        <Loader width="5rem" height="5rem" borderWidth="5px" borderColor="var(--lightred)" margin="auto" animation="1s spinLoader infinite"/>
    </div>
}

export default Splash;