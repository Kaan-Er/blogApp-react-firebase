const authState = {};

const authReducer = (state = authState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        uid: action.uid,
        email: action.email,
        photo: action.photo,
        displayName: action.displayName,
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default authReducer;
