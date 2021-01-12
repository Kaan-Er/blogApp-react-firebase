import { googleAuthProvider, firebase } from "../firebase/firebaseConfig";
import { history } from "../routers/AppRouter";

export const login = () => {
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
  return history.push("/");
};

export const logoutAction = () => ({
  type: "LOGOUT",
});
