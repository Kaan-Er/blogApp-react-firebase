import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import blogReducer from "../reducers/blogs";
import authReducer from "../reducers/auth";
import thunk from "redux-thunk";
import categoryReducer from "../reducers/categories";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      blogs: blogReducer,
      auth: authReducer,
      categories: categoryReducer,
    }),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
