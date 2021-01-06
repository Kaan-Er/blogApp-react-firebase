import React from "react";
import { connect } from "react-redux";
import { editBlogFromDatabase } from "../actions/blogs";
import MyEditor from "./myEditor";
import "./App.css";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditBlogPage = (props) => {
  return (
    <div className="container">
      <h3 className="text-center mt-5 addBlogText">Edit the blog</h3>
      <div className="border-bottom border-secondary w-25 mx-auto mb-5 mt-2"></div>
      <MyEditor
        blog={props.blog}
        onSubmit={(blog) => {
          const blogEdit = {
            title: blog.title,
            description: blog.description,
            category: blog.category,
            dateAdded: new Date().toLocaleDateString(),
            displayName: blog.displayName,
          };
          props.dispatch(
            editBlogFromDatabase(props.blog.id, blogEdit, props.auth.uid)
          );
          props.history.push("/blogs");
          window.location.reload();
        }}
        auth={props.auth}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    blog: state.blogs.find((b) => {
      return b.id === props.match.params.id;
    }),
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(EditBlogPage);
