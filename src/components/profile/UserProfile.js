import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./profile.css";

const UserProfile = ({ auth, blogs, comments }) => {
  var count = 0;
  var notificationNumber = comments.filter(
    (comment) => !comment.statu && comment.blogUid === auth.uid
  ).length;
  return (
    <div>
      <div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img mt-5">
                <img src={auth.photo} alt="profil_photo" />
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile-head">
                <h5 className="text-center mb-4">Profile</h5>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active mr-1"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      My Posts{" "}
                      {notificationNumber > 0 && (
                        <div class="notification-box">
                          <span class="notification-count">
                            {notificationNumber}
                          </span>{" "}
                        </div>
                      )}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="row"></div>
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>User Id</label>
                      </div>
                      <div className="col-md-6">
                        <p>{auth.uid}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{auth.displayName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{auth.email}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    {/* <div className="row"> */}
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Post</th>
                          <th scope="col">Waiting Comments </th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map((blog) => {
                          if (blog.uid === auth.uid) {
                            count++;
                            var waitingCommentNumber = comments.filter(
                              (comment) =>
                                !comment.statu && comment.blogId === blog.id
                            ).length;
                            return (
                              <tr>
                                <th scope="row">{count}</th>
                                <td>
                                  {
                                    <Link to={`/blogs/${blog.id}`}>
                                      {blog.title}
                                    </Link>
                                  }
                                </td>
                                <td>{waitingCommentNumber}</td>
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    blogs: state.blogs,
    comments: state.comments,
  };
};

export default connect(mapStateToProps)(UserProfile);
