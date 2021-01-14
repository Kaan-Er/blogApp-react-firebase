import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login, logout } from "../actions/auth";
import { firebase } from "../firebase/firebaseConfig";

const Header = (props) => {
  var notificationNumber = props.comments.filter(
    (comment) => !comment.statu && comment.blogUid === props.auth.uid
  ).length;
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg mt-4">
        <a className="navbar-brand" href="/">
          &#60; kodlayanBlog &#47;&#62;
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars text-danger"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mt-2 mt-lg-0 d-flex flex-row float-left">
            <li className="nav-item active mr-3">
              <a
                className="nav-link"
                href="https://www.linkedin.com/in/kaan--er/"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
            <li className="nav-item active mr-3">
              <a className="nav-link" href="https://github.com/Kaan-Er">
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li className="nav-item active mr-3">
              <a className="nav-link" href="https://twitter.com/kaaner_dev">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav mt-2 mt-lg-0 d-flex flex-row ml-auto float-right">
            {!firebase.auth().currentUser ? (
              <li className="nav-item active">
                <a className="nav-link " aria-current="page" onClick={login}>
                  Login <i className="fab fa-google-plus-g"></i>
                </a>
              </li>
            ) : (
              <>
                <li className="nav-item active mr-3">
                  <Link className="nav-link" to={`/user/${props.auth.uid}`}>
                    <i className="fas fa-user-circle ">
                      <span>
                        {notificationNumber > 0 && notificationNumber}
                      </span>
                    </i>
                  </Link>
                </li>
                <li className="nav-item active">
                  <a onClick={logout} className="nav-link">
                    <i className="fas fa-sign-out-alt "> </i>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="borderTop m-3"></div>
      <div className="tags d-flex justify-content-around" id="tags">
        <Link to="/">Home</Link>
        {props.categories.map((category) => {
          return (
            <Link to={`/category/${category.categoryPath}`}>
              {category.categoryName}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    categories: state.categories,
    comments: state.comments,
  };
};

export default connect(mapStateToProps)(Header);
