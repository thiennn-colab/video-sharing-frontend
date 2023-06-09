import { Fragment } from "react";
import { FaYoutube } from "react-icons/fa";

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid">
      <a className="navbar-brand" href="/">
        <FaYoutube /> Youtube Video Sharing
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/home">
              <b>Home</b>
            </a>
          </li>
          {!localStorage.getItem("access_token") ? (
            <Fragment>
              <li className="nav-item">
                <a className="nav-link btn btn-light" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-light" href="/register">
                  Register
                </a>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Welcome, {localStorage.getItem("email")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-light" href="/share-video">
                  Share a video
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link btn btn-light"
                  href="/"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar
