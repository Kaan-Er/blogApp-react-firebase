import React from "react";

const Header = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg mt-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            &#60; kodlayanBlog &#47;&#62;
          </a>
          <div
            className="collapse navbar-collapse d-flex justify-content-center ml-5 pl-5"
            id="navbarNav"
          >
            <a className="mx-3" href="https://www.linkedin.com/in/kaan--er/">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="mx-3" href="https://github.com/Kaan-Er">
              <i class="fab fa-github"></i>
            </a>
            <a className="mx-3" href="https://twitter.com/kaaner_dev">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
          <div
            className="collapse navbar-collapse d-flex flex-row-reverse"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Signup
              </a>
            </li> */}
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  // onClick={login}
                >
                  <i class="fas fa-user-circle"></i>{" "}
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="borderTop m-3"></div>
      <div className="tags d-flex justify-content-around">
        <a href="/">Home</a>
        <a href="#">Java</a>
        <a href="#">Javascript</a>
        <a href="#">React</a>
        <a href="#">Angular</a>
        <a href="#">Ruby on Rails</a>
        <a href="#">Html</a>
        <a href="#">Css</a>
        <a href="#">Dev-Ops</a>
        <a href="#">Other</a>
      </div>
    </div>
  );
};

export default Header;
