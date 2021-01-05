import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteBlogFromDatabase } from "../actions/blogs";

const BlogListItem = (props) => {
  return (
    <div className="mx-3 mb-5">
      <div className="blogDate">
        {props.dateAdded} / {props.category}
      </div>
      <div className="blogTitle d-inline-block">
        <Link to={`/blogs/${props.id}`}>{props.title}</Link> —&#160;
      </div>
      <div className="blogContext d-inline-block">
        {props.description.replace(/<[^>]+>/g, "").split("", 250)}...
      </div>
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
