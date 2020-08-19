import React from "react";
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

  return (
    <div className="navbar navbar-expand-lg bg-white app-bar">
      {/* {isLogoVisible && (
        <Link className="navbar-brand" to="/">
          <Logo />
        </Link>
      )} */}
      <h2 className="title">{title}</h2>
    </div>
  );
};

export default AppBar;
