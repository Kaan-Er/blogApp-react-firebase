import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { getBlogsFromDatabase, clearBlogs } from "./actions/blogs";
import { firebase } from "./firebase/firebaseConfig";
import { loginAction, logoutAction } from "./actions/auth";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";

const store = configureStore();

const result = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById("root"));

let isRendered = false;

const renderApp = () => {
  if (!isRendered) {
    ReactDOM.render(result, document.getElementById("root"));
    isRendered = true;
  }
};

store.dispatch(getBlogsFromDatabase()).then(() => {
  renderApp();
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch(loginAction(user.uid));
    store.dispatch(getBlogsFromDatabase()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/blogs");
      }
    });
  } else {
    store.dispatch(logoutAction());
    // store.dispatch(clearBlogs());
    renderApp();
    history.push("/");
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
