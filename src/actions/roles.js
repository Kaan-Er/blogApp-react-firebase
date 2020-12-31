import database from "../firebase/firebaseConfig";

export const addRole = (role) => ({
  type: "ADD_ROLE",
  role,
});

export const addRoleToDatabase = (role = "") => {
  return (dispatch) => {
    database
      .ref("roles")
      .push(role)
      .then((res) => {
        dispatch(
          addRole({
            role,
          })
        );
      });
  };
};

export const setRoles = (roles) => ({
  type: "SET_ROLES",
  roles,
});

export const getRolesFromDatabase = () => {
  return (dispatch) => {
    // database.ref("roles").set(["Admin", "User"]);
    return database
      .ref("roles")
      .once("value")
      .then((snapshot) => {
        const roles = [];

        snapshot.forEach((role) => {
          roles.push({
            id: role.key,
            ...role.val(),
          });
        });
        dispatch(setRoles(roles));
      });
  };
};
