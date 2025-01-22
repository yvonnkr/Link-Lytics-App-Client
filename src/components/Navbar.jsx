import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contex/contextApi.jsx";
import { jwtDecode } from "jwt-decode";
import { sessionExpiredToast } from "../utils/common.js";

const Navbar = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { token, setToken, username, setUsername } = useStoreContext();
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    if (token) {
      autoLogoutIfTokenExpired(token);
    }
  }, [token]);

  const autoLogoutIfTokenExpired = (currentToken) => {
    const decoded = jwtDecode(currentToken);
    const expirationTime = decoded.exp ? decoded.exp * 1000 : null; // `exp` is in seconds, convert to milliseconds
    const now = Date.now();
    const remainingTime = expirationTime - now;

    if (remainingTime > 0) {
      setTimeout(() => {
        logOutHandler();
        sessionExpiredToast();
      }, remainingTime); // Logout after remaining time
    } else {
      logOutHandler(); // Logout immediately if the token is already expired
      sessionExpiredToast();
    }
  };

  const logOutHandler = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USERNAME");
    navigate("/login");
  };

  const displayLoggedInUser = () => {
    const loggedInUser = username;
    if (loggedInUser) {
      return (
        <span style={{ marginRight: "0.5rem", color: "#555" }}>
          <strong>
            {loggedInUser.charAt(0).toUpperCase() + loggedInUser.slice(1)}
          </strong>
        </span>
      );
    }
  };

  return (
    <div className="h-16 bg-custom-gradient  z-50 flex items-center sticky top-0 ">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        <Link to="/">
          <h1 className="font-bold text-3xl text-white italic sm:mt-0 mt-2">
            Linklytics
          </h1>
        </Link>
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center sm:mt-1 sm:pt-0 pt-3 text-slate-800 sm:static absolute left-0 top-[62px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }  transition-all duration-100 sm:h-fit sm:bg-none  bg-custom-gradient sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          <li className="hover:text-btnColor font-[500]  transition-all duration-150">
            <Link
              className={`${
                path === "/" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="hover:text-btnColor font-[500]  transition-all duration-150">
            <Link
              className={`${
                path === "/about" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
          {token && (
            <li className="hover:text-btnColor font-[500]  transition-all duration-150">
              <Link
                className={`${
                  path === "/dashboard"
                    ? "text-white font-semibold"
                    : "text-gray-200"
                }`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
          {!token && (
            <div className="flex items-center">
              <Link to="/login" className="mx-2">
                <li className="sm:ml-0 ml-0  text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md  hover:text-slate-300 transition-all duration-150">
                  Login
                </li>
              </Link>
              <Link to="/register">
                <li className="sm:ml-0 -ml-1  bg-violet-800/50   text-white  cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md  hover:text-slate-300   transition-all duration-150">
                  Sign Up
                </li>
              </Link>
            </div>
          )}

          {token && (
            <div className="flex items-center m-2">
              {displayLoggedInUser()}
              <button
                onClick={logOutHandler}
                className="sm:ml-0 -ml-1  text-white bg-violet-800/50  cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md  hover:text-slate-300   transition-all duration-150"
              >
                Sign Out
              </button>
            </div>
          )}
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
