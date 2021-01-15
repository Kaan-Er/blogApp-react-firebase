import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BlogListItem from "./BlogListItem";
import Footer from "./Footer";

const BlogList = (props) => {
  return (
    <div>
      <div id="blogListPage">
        {props.auth.uid && (
          <Link
            className="btn btn-danger m-3 mb-5 float-right d-inline-block"
            to="/create"
          >
            New Blog
          </Link>
        )}
        <ul className="list-group d-inline-block mb-5">
          {props.blogs.map((blog) => {
            return <BlogListItem {...blog} />;
          })}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    blogs: state.blogs,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(BlogList);
