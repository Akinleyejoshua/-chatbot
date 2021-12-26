import { HomeHeader } from "..";
import { SideBar, Splash } from "../../components";
import { useSelector } from "react-redux";

const DesktopView = ({ data, notfound, child, notfoundtrue }) => {
  const home = useSelector((state) => state.home);

  return (
    <div className="desktop-view">
      <Splash loading={home.loading} />

      <HomeHeader />
      <main>
        <div className="row">
          <SideBar />
          <div className="main">
            {notfoundtrue ? notfound : child}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DesktopView;
