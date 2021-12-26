import { IconLink } from "../";
import { Logout } from "../../services/user";

const SideBar = ({ data }) => {
  return (
    <div className="sidebar">
      <IconLink value="Dashboard" link="/dashboard" icon="fa fa-chart-bar" />
      <IconLink
        value="Dubai"
        link="/dubai-properties"
        icon="fa fa-house-user"
      />
      <IconLink value="Homes" link="/home-properties" icon="fa fa-house-user" />
      <IconLink value="Lands" link="/land-properties" icon="fa fa-landmark" />
      {/* <IconLink value="USA" link="/dashboard" icon="fa fa-house-user"/> */}
      <IconLink value="UK" link="/uk-properties" icon="fa fa-house-user" />

      <div className="hl"></div>

      <div onClick={() => Logout()}>
        <IconLink value="Logout" link="/signin" icon="fa fa-sign-out-alt" />
      </div>
    </div>
  );
};

export default SideBar;
