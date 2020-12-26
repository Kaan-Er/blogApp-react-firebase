import React from "react";
import { connect } from "react-redux";
import BlogListItem from "./BlogListItem";

const BlogList = (props) => {
  return (
    <ul>
      {props.blogs.map((blog) => {
        return <BlogListItem {...blog} />;
      })}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps)(BlogList);
