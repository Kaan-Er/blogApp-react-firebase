import React from "react";
import CategoryBlogList from "./CategoryBlogList";

const CategoryBlogListPage = (props) => {
  return (
    <div className="container mt-5">
      <CategoryBlogList {...props} />
    </div>
  );
};

export default CategoryBlogListPage;
