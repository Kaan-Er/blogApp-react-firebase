const adminState = [];

const adminReducer = (state = adminState, action) => {
  switch (action.type) {
    case "ADD_ADMİN":
      return [...state, action.admin];
    case "SET_ADMİNS":
      return action.admins;
    case "CLEAR_ADMİNS":
      return [];
    default:
      return state;
  }
};

export default adminReducer;
