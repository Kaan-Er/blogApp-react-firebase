import { googleAuthProvider, firebase } from "../firebase/firebaseConfig";

export const login = () => {
  // console.log(firebase.auth().signInWithPopup(googleAuthProvider));
  return firebase.auth().signInWithPopup(googleAuthProvider);
};

export const loginAction = (user) => ({
  type: "LOGIN",
  uid: user.uid,
  email: user.email,
  photo: user.photoURL,
  displayName: user.displayName,
});

export const logout = () => {
  firebase.auth().signOut();

  return window.location.reload();
};

export const logoutAction = () => ({
  type: "LOGOUT",
});
