import React from "react";
import { Link } from "react-router-dom";

const BlogListItem = (props) => {
  return (
    <div className="mx-3 mb-5">
      <div className="blogDate">
        {props.dateAdded} / {props.category}
      </div>
      <div className="blogTitle">
        <Link to={`/blogs/${props.id}`}>{props.title}</Link> &#160; <br />
      </div>
      <div className="blogContext">
        {props.description.replace(/<[^>]+>/g, "").split("", 250)}...
      </div>
    </div>
  );
};

export default BlogListItem;
