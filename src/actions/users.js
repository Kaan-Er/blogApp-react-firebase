import database from "../firebase/firebaseConfig";

export const setUsers = (users) => ({
  type: "SET_USERS",
  users,
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
