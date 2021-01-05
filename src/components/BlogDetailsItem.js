import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import { deleteBlogFromDatabase } from "../actions/blogs";

const BlogDetailsItem = (props) => {
  const uid = props.auth.uid;
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="blogDetails mx-3">
          <h3 className="d-flex flex-row">
            {props.blog?.title}{" "}
            <div className="ml-auto mr-2">
              {uid === props.blog.uid && (
                <Link
                  className="mr-3"
                  id="blogEditButton"
                  to={`/edit/${props.blog.id}`}
                >
                  <i
                    className="fas fa-edit"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit the blog"
                  ></i>
                </Link>
              )}
              {uid === props.blog.uid && (
                <Link
                  to="/"
                  id="blogDeleteButton"
                  onClick={(e) => {
                    props.dispatch(
                      deleteBlogFromDatabase(props.auth.uid, props.blog.id)
                    );
                  }}
                >
                  <i
                    className="fas fa-trash-alt"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete the blog"
                  ></i>
                </Link>
              )}
            </div>
          </h3>
          <h5 className="mb-5">
            {props.blog?.dateAdded} tarihinde {props.blog?.displayName}{" "}
            tarafından eklendi.
          </h5>
          <p
            dangerouslySetInnerHTML={{
              __html: props.blog?.description,
            }}
            className="mb-5"
          ></p>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteBlogFromDatabase,
  dispatch,
});

const mapStateToProps = (state, props) => {
  return {
    blog: state.blogs.find((b) => {
      return b.id === props.match.params.id;
    }),
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailsItem);
