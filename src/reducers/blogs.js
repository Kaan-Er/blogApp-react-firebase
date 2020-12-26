const state = {
  blogs: [
    {
      id: 1,
      title: "blog title 1",
      description: "description 1",
      dateAdded: 0,
    },
    {
      id: 2,
      title: "blog title 2",
      description: "description 2",
      dateAdded: 0,
    },
  ],
  auth: {
    userId: 1,
    username: "kaan",
    email: "kaan@hotmail.com",
  },
};

const blogState = [];

const blogReducer = (state = blogState, action) => {
  switch (action.type) {
    case "ADD_BLOG":
      return [...state, action.blog];
    case "REMOVE_BLOG":
      return state.filter(({ id }) => {
        return id !== action.id;
      });
    case "EDIT_BLOG":
      return state.map((blog) => {
        if (blog.id === action.id) {
          return {
            ...blog,
            ...action.updates,
          };
        } else {
          return blog;
        }
      });
    case "SET_BLOGS":
      return action.blogs;
    case "CLEAR_BLOGS":
      return [];
    default:
      return state;
  }
};

export default blogReducer;
