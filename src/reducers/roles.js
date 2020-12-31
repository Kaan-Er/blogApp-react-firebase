const roleState = [];

const roleReducere = (state = roleState, action) => {
  switch (action.type) {
    case "ADD_ROLE":
      return [...state, action.role];
    case "SET_ROLES":
      return action.roles;
  }
};
