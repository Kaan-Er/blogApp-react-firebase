import React from "react";
import BlogList from "./BlogList";

const BlogListPage = (props) => {
  return (
    <div className="container mt-5">
      <BlogList {...props} />
    </div>
  );
};

export default BlogListPage;
