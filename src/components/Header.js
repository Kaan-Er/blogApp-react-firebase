import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login, logout } from "../actions/auth";
import { firebase } from "../firebase/firebaseConfig";

const Header = (props) => {
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
              <i className="fab fa-github"></i>
            </a>
            <a className="mx-3" href="https://twitter.com/kaaner_dev">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <div
            className="collapse navbar-collapse d-flex flex-row-reverse"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {!firebase.auth().currentUser ? (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={login}
                  >
                    Login <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
              ) : (
                <a>
                  <li className="nav-item">
                    <Link to={`/user/${props.auth.uid}`}>
                      <i className="fas fa-user-circle mr-3"></i>
                    </Link>
                    <a onClick={logout}>
                      <i className="fas fa-sign-out-alt"> </i>
                    </a>
                  </li>
                </a>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="borderTop m-3"></div>
      <div className="tags d-flex justify-content-around">
        <a href="/">Home</a>
        {props.categories.map((category) => {
          var categoryPath = category.split(" ").join("").toLowerCase();
          return <a href={`/${categoryPath}`}>{category}</a>;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(Header);
