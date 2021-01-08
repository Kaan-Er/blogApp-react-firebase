import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { getBlogsFromDatabase, clearBlogs } from "./actions/blogs";
import { getRolesFromDatabase } from "./actions/roles";
import { firebase } from "./firebase/firebaseConfig";
import { loginAction, logoutAction } from "./actions/auth";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import {
  addBlogCategoryToDatabase,
  clearCategories,
  getCategoriesFromDatabase,
} from "./actions/categories";
import {
  addAdminToDatabase,
  clearAdmins,
  getAdminsFromDatabase,
} from "./actions/admins";
import {
  addCommentToDatabase,
  getCommentsFromDatabase,
} from "./actions/comments";

const store = configureStore();

const result = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let isRendered = false;

const renderApp = () => {
  if (!isRendered) {
    ReactDOM.render(result, document.getElementById("root"));
    isRendered = true;
  }
};

store.dispatch(getRolesFromDatabase());

store.dispatch(getCategoriesFromDatabase());

store.dispatch(getBlogsFromDatabase()).then(() => {
  renderApp();
});

store.dispatch(getCommentsFromDatabase());

// store.dispatch(addAdminToDatabase("8M7uAYX9m4VdiFxP2njt7FOGnvG3")); // Add the new admin

store.dispatch(getAdminsFromDatabase());

// store.dispatch(addBlogCategoryToDatabase("Html"));

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // console.log(user.uid);
    store.dispatch(loginAction(user));
    store.dispatch().then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        return history.push("/blogs");
      }
    });
  } else {
    store.dispatch(logoutAction());
    store.dispatch(clearBlogs());
    store.dispatch(clearCategories());
    store.dispatch(clearAdmins());
    renderApp();
    history.push("/");
  }
});

reportWebVitals();
