import React from "react";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";
import Header from "./Header";

const BlogListPage = (props) => {
  return (
    <div className="container mt-5">
      <BlogList {...props} />
    </div>
  );
};

export default BlogListPage;
