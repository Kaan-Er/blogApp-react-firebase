import React from "react";
import Header from "./Header";

const BlogDetailsItem = ({ title, description, dateAdded }) => {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="blogDetails mx-3">
          <h3>{title}</h3>
          <h5 className="mb-5">{dateAdded} tarihinde eklendi.</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsItem;
