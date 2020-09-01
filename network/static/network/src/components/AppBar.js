import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import MaterialIcon from "./MaterialIcon";
// import { Link } from "react-router-dom";
// import Logo from "./components/Logo";

const AppBar = ({ title, subTitle }) => {
  //   const [isLogoVisible, setIsLogoVisible] = useState(false);

  //   useEffect(() => {
  //     window.addEventListener("resize", () => {
  //       if (window.innerWidth >= 960) return setIsLogoVisible(false);
  //       return setIsLogoVisible(true);
  //     });
  //   }, []);
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="navbar navbar-expand-lg bg-white app-bar sticky-top">
      {/* {isLogoVisible && (
        <Link className="navbar-brand" to="/">
          <Logo />
        </Link>
      )} */}
      <div className="d-flex w-100 align-items-center">
        {location.pathname !== "/" && (
          <button className="mt-2 mr-3" onClick={() => history.goBack()}>
            <MaterialIcon name="arrow_back" />
          </button>
        )}
        <div className="d-flex flex-column">
          <h2 className="title">{title}</h2>
          <small className="text-muted">{subTitle}</small>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
