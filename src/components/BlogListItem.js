import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteBlogFromDatabase } from "../actions/blogs";

const BlogListItem = (props) => {
  const uid = props.auth.uid;
  return (
    <>
      <li>
        {props.title} - <Link to={`/blogs/${props.id}`}>Details</Link>{" "}
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
      </li>
    </>
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
