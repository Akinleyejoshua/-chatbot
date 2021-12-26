import { useHistory } from "react-router";

const IconLink = ({ value, link, icon}) => {
    const history = useHistory();
    const path = window.location.pathname;

  return (
    <div className={path === link ? "icon-link active" : "icon-link"} onClick={() => history.push(link)}>
      <i
        className={icon}
        style={{
        //   marginRight: "1rem",
        //   width: "3rem"
        }}
      ></i>
      <p>{value}</p>
    </div>
  );
};

export default IconLink;
