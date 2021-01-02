import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const BlogDetailsItem = (props) => {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="blogDetails mx-3">
          <h3>{props.blog?.title}</h3>
          <h5 className="mb-5">
            {props.blog?.dateAdded} tarihinde {props.blog?.displayName}{" "}
            tarafından eklendi.
          </h5>
          <p>{props.blog?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsItem;
