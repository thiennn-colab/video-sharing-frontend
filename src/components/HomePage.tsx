import React, { Fragment } from "react";

const HomePage: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Video Sharing
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
          {/* <li className="nav-item">
            <a className="nav-link" href="/home">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link me-10" href="/contact">
              Contact
            </a>
          </li> */}
          {!localStorage.getItem("access_token") ? (
            <li className="nav-item">
              <a className="nav-link btn btn-light" href="/login">
                Login
              </a>
            </li>
          ) : (
            <Fragment>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Welcome, {localStorage.getItem("email")}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link btn btn-light"
                  href="#"
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
};

export default HomePage;
