import database from "../firebase/firebaseConfig";

export const addCategory = (category) => ({
  type: "ADD_CATEGORY",
  category,
});

export const addBlogCategoryToDatabase = (category) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database
      .ref("category")
      .push(category)
      .then(() => {
        dispatch(addCategory(category));
      });
  };
};

export const setCategories = (categories) => ({
  type: "SET_CATEGORİES",
  categories,
});

export const getCategoriesFromDatabase = () => {
  return (dispatch) => {
    return database
      .ref("category")
      .once("value")
      .then((snapshot) => {
        const categories = [];

        snapshot.forEach((category) => {
          categories.push(category.val());
        });
        dispatch(setCategories(categories));
      });
  };
};

export const clearCategories = () => ({
  type: "CLEAR_CATEGORİES",
});
