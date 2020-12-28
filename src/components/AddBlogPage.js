import React from "react";
import BlogFrom from "./BlogFrom";
import { connect } from "react-redux";
import { addBlogToDatabase } from "../actions/blogs";

const AddBlogPage = (props) => {
  return (
    <div>
      <h3>Add Blog</h3>
      <BlogFrom
        onSubmit={(blog) => {
          props.dispatch(addBlogToDatabase(blog));
          props.history.push("/blogs");
        }}
      />
    </div>
  );
};

export default connect()(AddBlogPage);
