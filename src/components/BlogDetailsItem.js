import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import { deleteBlogFromDatabase } from "../actions/blogs";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { addCommentToDatabase } from "../actions/comments";

const getHtml = (editorContent) =>
  draftToHtml(convertToRaw(editorContent.getCurrentContent()));

var description = "";

const BlogDetailsItem = (props) => {
  const uid = props.auth.uid;

  var onEditorStateChange = (editorContent) =>
    (description = getHtml(editorContent));

  var sendComment = () => {
    props.dispatch(
      addCommentToDatabase({
        description: description,
        displayName: props.auth.displayName,
        blogUid: props.blog.uid,
        blogId: props.blog.id,
        photo: props.auth.photo,
        statu: false,
        dateAdded: new Date().toLocaleDateString(),
      })
    );
    window.location.reload();
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="blogDetails mx-3">
          <h3 className="d-flex flex-row">
            {props.blog?.title}{" "}
            <div className="ml-auto mr-2">
              {uid === props.blog.uid && (
                <Link
                  className="mr-3"
                  id="blogEditButton"
                  to={`/edit/${props.blog.id}`}
                >
                  <i
                    className="fas fa-edit"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit the blog"
                  ></i>
                </Link>
              )}
              {uid === props.blog.uid && (
                <Link
                  to="/"
                  id="blogDeleteButton"
                  onClick={(e) => {
                    props.dispatch(
                      deleteBlogFromDatabase(props.auth.uid, props.blog.id)
                    );
                  }}
                >
                  <i
                    className="fas fa-trash-alt"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete the blog"
                  ></i>
                </Link>
              )}
            </div>
          </h3>
          <h5 className="mb-5">
            {props.blog?.dateAdded} tarihinde {props.blog?.displayName}{" "}
            tarafından eklendi.
          </h5>
          <p
            dangerouslySetInnerHTML={{
              __html: props.blog?.description,
            }}
            className="mb-5"
          ></p>
        </div>
        <div id="comments">
          <hr />
          {props.comments.length > 0 &&
            props.comments.map((comment) => (
              <div>
                <div className="comment mt-4 text-justify float-left">
                  {" "}
                  <img
                    src={
                      comment.photo
                        ? comment.photo
                        : "https://i.imgur.com/yTFUilP.jpg"
                    }
                    alt=""
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                  <h4> {comment.displayName}</h4>{" "}
                  <span className="float-right">{comment.dateAdded}</span>{" "}
                  <br />
                  <p
                    className="mt-2"
                    dangerouslySetInnerHTML={{
                      __html: comment?.description,
                    }}
                  ></p>
                </div>
              </div>
            ))}
        </div>
        <div id="commentEditor">
          <p className="text-center" id="errorText">
            <i class="fas fa-exclamation-triangle"></i> Your comment will be
            published after confirmation by the owner of the post.
          </p>
          <Editor
            // editorState={this.editorContent}
            wrapperClassName="rich-editor demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <div className="text-center mb-5">
          <button
            className="btn btn-danger mx-auto mb-5 d-inline-block"
            onClick={sendComment}
          >
            Send Comment
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteBlogFromDatabase,
  addCommentToDatabase,
  dispatch,
});

const mapStateToProps = (state, props) => {
  return {
    blog: state.blogs.find((b) => {
      return b.id === props.match.params.id;
    }),
    auth: state.auth,
    comments: state.comments.filter(
      (comment) => comment.blogId == props.match.params.id
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailsItem);
