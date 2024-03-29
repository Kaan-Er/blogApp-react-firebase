import database from "../firebase/firebaseConfig";

export const addComment = (comment) => ({
  type: "ADD_COMMENT",
  comment,
});

export const addCommentToDatabase = (commentData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      dateAdded = 0,
      displayName = "",
      blogUid = "",
      blogId = "",
      photo = "",
      statu,
    } = commentData;
    const comment = {
      description,
      dateAdded,
      uid,
      displayName,
      blogUid,
      blogId,
      photo,
      statu,
    };

    uid === comment.blogUid ? (comment.statu = true) : (comment.statu = false);

    database
      .ref("comments")
      .push(comment)
      .then((res) => {
        dispatch(
          addComment({
            id: res.key,
            ...comment,
          })
        );
      });
  };
};

export const removeComment = (id) => ({
  type: "REMOVE_COMMENT",
  id: id,
});

export const removeCommentFromDatabase = (id) => {
  return (dispatch) => {
    return database
      .ref(`comments/${id}`)
      .remove()
      .then(() => {
        dispatch(removeComment(id));
      });
  };
};

export const editComment = (updates) => ({
  type: "EDIT_COMMENT",
  updates,
});

export const editCommentFromDatabase = (id, updates, userId) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (uid === userId) {
      database
        .ref(`comments/${id}`)
        .update(updates)
        .then(() => {
          dispatch(editComment({ ...updates }));
        });
    }
  };
};

export const approveComment = (id) => ({
  type: "APPROVE_COMMENT",
  id,
});

export const approveCommentFromDatabase = (commentId, blogUid) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (uid === blogUid) {
      database
        .ref(`comments/${commentId}`)
        .update({ statu: true })
        .then(() => {
          dispatch(approveComment(commentId));
        });
    }
  };
};

export const clearComments = () => ({
  type: "CLEAR_COMMENTS",
});

export const setComments = (comments) => ({
  type: "SET_COMMENTS",
  comments,
});

export const getCommentsFromDatabase = () => {
  return (dispatch) => {
    return database
      .ref("comments")
      .once("value")
      .then((snapshot) => {
        const comments = [];

        snapshot.forEach((comment) => {
          comments.push({
            id: comment.key,
            ...comment.val(),
          });
        });
        dispatch(setComments(comments));
      });
  };
};
