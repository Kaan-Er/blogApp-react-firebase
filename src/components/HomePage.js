import React from "react";
import { login } from "../actions/auth";
import BlogListPage from "./BlogListPage";
import Header from "./Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <BlogListPage />
    </div>
  );
};

export default HomePage;
