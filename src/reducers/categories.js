const category = [];

const categoryReducer = (state = category, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return [...state, action.category];
    case "SET_CATEGORİES":
      return action.categories;
    case "CLEAR_CATEGORİES":
      return [];
    default:
      return state;
  }
};

export default categoryReducer;
