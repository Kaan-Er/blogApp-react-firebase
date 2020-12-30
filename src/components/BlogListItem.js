import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteBlogFromDatabase } from "../actions/blogs";

const BlogListItem = (props) => {
  const uid = props.auth.uid;
  return (
    <div className="mx-3 mb-5">
      <div className="blogDate">{props.dateAdded}</div>
      <div className="blogTitle d-inline">
        <Link to={`/blogs/${props.id}`}>{props.title}</Link> —
      </div>
      <div className="blogContext d-inline">
        {" "}
        {props.description.split("", 250)}...
      </div>
      <>
        {uid == props.uid && <Link to={`/edit/${props.id}`}>Edit</Link>}
        {uid == props.uid && (
          <button
            onClick={(e) => {
              props.dispatch(deleteBlogFromDatabase(props.uid, props.id));
            }}
          >
            Delete
          </button>
        )}
      </>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteBlogFromDatabase,
  dispatch,
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogListItem);
