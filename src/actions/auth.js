import { googleAuthProvider, firebase } from "../firebase/firebaseConfig";

export const login = () => {
  return firebase.auth().signInWithPopup(googleAuthProvider);
};

export const loginAction = (uid) => ({
  type: "LOGIN",
  uid,
});

export const logout = () => {
  firebase.auth().signOut();

  return window.location.reload();
};

export const logoutAction = () => ({
  type: "LOGOUT",
});
