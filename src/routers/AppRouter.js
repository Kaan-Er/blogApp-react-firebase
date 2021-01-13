import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import BlogDetailsPage from "../components/BlogDetailsPage";
import BlogListPage from "../components/BlogListPage";
import ContactPage from "../components/ContactPage";
import NotFoundPage from "../components/NotFoundPage";
import AddBlogPage from "../components/AddBlogPage";
import EditBlogPage from "../components/EditBlogPage";
import createHistory from "history/createBrowserHistory";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import HomePage from "../components/HomePage";
import UserProfile from "../components/profile/UserProfile";
import CategoryBlogListPage from "../components/CategoryBlogListPage";
import CategoryPage from "../components/CategoryPage";

export const history = createHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={HomePage} exact />
          <PrivateRoute path="/blogs" component={BlogListPage} exact />
          <PrivateRoute path="/create" component={AddBlogPage} />
          <PrivateRoute path="/edit/:id" component={EditBlogPage} />
          <PrivateRoute path="/user/:uid" component={UserProfile} />
          <Route path="/category/:key" component={CategoryPage} />
          <Route path="/blogs/:id" component={BlogDetailsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
