import React from "react";
import { connect } from "react-redux";
import { addBlogToDatabase } from "../actions/blogs";
import MyEditor from "./myEditor";

const AddBlogPage = (props) => {
  return (
    <div className="container">
      <h3 className="text-center mt-5 addBlogText">Add new blog</h3>
      <div className="border-bottom border-secondary w-25 mx-auto mb-5 mt-2"></div>
      <MyEditor
        onSubmit={(blog) => {
          props.dispatch(addBlogToDatabase(blog));
          props.history.push("/blogs");
        }}
        auth={props.auth}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(AddBlogPage);
