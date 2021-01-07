import database from "../firebase/firebaseConfig";

export const addAdmin = (uid) => ({
  type: "ADD_ADMİN",
  uid,
});

export const addAdminToDatabase = (uid) => {
  return (dispatch) => {
    database
      .ref("admins")
      .push(uid)
      .then(() => {
        dispatch(addAdmin(uid));
      });
  };
};

export const setAdmins = (admins) => ({
  type: "SET_ADMİNS",
  admins,
});

export const getAdminsFromDatabase = () => {
  return (dispatch) => {
    return database
      .ref("admins")
      .once("value")
      .then((snapshot) => {
        const admins = [];

        snapshot.forEach((admin) => {
          admins.push(admin.val());
        });
        dispatch(setAdmins(admins));
      });
  };
};

export const clearAdmins = () => ({
  type: "CLEAR_ADMİNS",
});
