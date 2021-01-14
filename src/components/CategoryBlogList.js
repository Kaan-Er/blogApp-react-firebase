import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BlogListItem from "./BlogListItem";
import Footer from "./Footer";
import Pagination from "./Pagination";

const CategoryBlogList = (props) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = () => {
      var postlar = props.blogs.filter(
        (blog) => props.category.categoryName === blog.category
      );
      const res = postlar;
      setPosts(res);
    };
    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div id="blogListPage">
        {props.auth.uid && (
          <div className="w-100 d-inline-block">
            <Link
              className="btn btn-danger m-3 mb-5 float-right d-block"
              to="/create"
            >
              New Blog
            </Link>
          </div>
        )}
        <ul className="list-group d-inline-block mb-5">
          {props.blogs.map((blog) => {
            if (props.category.categoryName === blog.category) {
              return <BlogListItem {...blog} />;
            }
          })}
        </ul>
      </div>
      <div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    blogs: state.blogs,
    auth: state.auth,
    category: state.categories.find((c) => {
      return c.categoryPath === props.match.params.key;
    }),
  };
};

export default connect(mapStateToProps)(CategoryBlogList);
