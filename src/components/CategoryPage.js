import React from "react";
import CategoryBlogListPage from "./CategoryBlogListPage";
import Header from "./Header";

const CategoryPage = (props) => {
  return (
    <div>
      <Header />
      <CategoryBlogListPage {...props} />
    </div>
  );
};

export default CategoryPage;
