import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import BlogDetailsPage from "../components/BlogDetailsPage";
import BlogListPage from "../components/BlogListPage";
import ContactPage from "../components/ContactPage";
import NotFoundPage from "../components/NotFoundPage";
import AddBlogPage from "../components/AddBlogPage";
import EditBlogPage from "../components/EditBlogPage";
import LoginPage from "../components/LoginPage";
import createHistory from "history/createBrowserHistory";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import HomePage from "../components/HomePage";

export const history = createHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={HomePage} exact />
          <PublicRoute path="/blogs" component={BlogListPage} exact />
          <PrivateRoute path="/create" component={AddBlogPage} />
          <PrivateRoute path="/edit/:id" component={EditBlogPage} />
          <PublicRoute path="/blogs/:id" component={BlogDetailsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
