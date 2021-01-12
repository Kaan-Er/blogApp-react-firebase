import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import { deleteBlogFromDatabase } from "../actions/blogs";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import {
  addCommentToDatabase,
  approveCommentFromDatabase,
  removeCommentFromDatabase,
} from "../actions/comments";
import Footer from "./Footer";

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
              {uid === props.blog?.uid && (
                <Link
                  className="mr-3"
                  id="blogEditButton"
                  to={`/edit/${props.blog?.id}`}
                >
                  <i
                    className="fas fa-edit"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit the blog"
                  ></i>
                </Link>
              )}
              {uid === props.blog?.uid && (
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
          {(props.approveComments.length > 0 || props.auth.uid) && <hr />}
          {props.comments.length > 0 &&
            props.comments.map((comment) => {
              if (
                (!props.auth.uid || comment.blogUid != props.auth.uid) &&
                comment.statu
              ) {
                return (
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
                      <h4>
                        {" "}
                        {comment.displayName}{" "}
                        {comment.blogUid === props.auth.uid &&
                          !comment.statu && (
                            <a
                              href={`/blogs/${comment.blogId}`}
                              onClick={() => {
                                props.dispatch(
                                  approveCommentFromDatabase(
                                    comment.id,
                                    comment.blogUid
                                  )
                                );
                              }}
                            >
                              <i
                                className="fas fa-check-circle"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Approve the comment"
                              ></i>
                            </a>
                          )}{" "}
                        {comment.statu &&
                          comment.blogUid === props.auth.uid && (
                            <i
                              className="fas fa-check-circle"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Approved comment"
                            ></i>
                          )}{" "}
                        {comment.blogUid === props.auth.uid && (
                          <a
                            // href={`/blogs/${comment.blogId}`}
                            type="button"
                            onClick={() => {
                              props.dispatch(
                                removeCommentFromDatabase(comment.id)
                              );
                            }}
                          >
                            <i
                              className="fas fa-trash-alt"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete this comment"
                            ></i>
                          </a>
                        )}
                      </h4>{" "}
                      <span className="float-right">{comment.dateAdded}</span>{" "}
                      <hr />
                      <br />
                      <p
                        dangerouslySetInnerHTML={{
                          __html: comment?.description,
                        }}
                      ></p>
                    </div>
                  </div>
                );
              } else if (
                comment.blogUid != props.auth.uid &&
                !comment.statu &&
                comment.uid === props.auth.uid
              ) {
                return (
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
                      <h4>
                        {" "}
                        {comment.displayName}{" "}
                        {comment.blogUid === props.auth.uid &&
                          !comment.statu && (
                            <a
                              href={`/blogs/${comment.blogId}`}
                              onClick={() => {
                                props.dispatch(
                                  approveCommentFromDatabase(
                                    comment.id,
                                    comment.blogUid
                                  )
                                );
                              }}
                            >
                              <i
                                className="fas fa-check-circle"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Approve the comment"
                              ></i>
                            </a>
                          )}{" "}
                        <i
                          id="waitingApproval"
                          className="fas fa-exclamation-circle"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Your comment is waiting for approval"
                        ></i>{" "}
                        {comment.blogUid === props.auth.uid && (
                          <a
                            // href={`/blogs/${comment.blogId}`}
                            type="button"
                            onClick={() => {
                              props.dispatch(
                                removeCommentFromDatabase(comment.id)
                              );
                            }}
                          >
                            <i
                              className="fas fa-trash-alt"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete this comment"
                            ></i>
                          </a>
                        )}
                      </h4>{" "}
                      <span className="float-right">{comment.dateAdded}</span>{" "}
                      <hr />
                      <br />
                      <p
                        dangerouslySetInnerHTML={{
                          __html: comment?.description,
                        }}
                      ></p>
                    </div>
                  </div>
                );
              } else {
                return (
                  comment.blogUid === props.auth.uid && (
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
                        <h4>
                          {" "}
                          {comment.displayName}{" "}
                          {comment.blogUid === props.auth.uid &&
                            !comment.statu && (
                              <a
                                href={`/blogs/${comment.blogId}`}
                                onClick={() => {
                                  props.dispatch(
                                    approveCommentFromDatabase(
                                      comment.id,
                                      comment.blogUid
                                    )
                                  );
                                }}
                              >
                                <i
                                  className="fas fa-check-circle"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Approve the comment"
                                ></i>
                              </a>
                            )}{" "}
                          {comment.statu &&
                            comment.blogUid === props.auth.uid && (
                              <i
                                className="fas fa-check-circle"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Approved comment"
                              ></i>
                            )}{" "}
                          {comment.blogUid === props.auth.uid && (
                            <a
                              // href={`/blogs/${comment.blogId}`}
                              type="button"
                              onClick={() => {
                                props.dispatch(
                                  removeCommentFromDatabase(comment.id)
                                );
                              }}
                            >
                              <i
                                className="fas fa-trash-alt"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete this comment"
                              ></i>
                            </a>
                          )}
                        </h4>{" "}
                        <span className="float-right">{comment.dateAdded}</span>{" "}
                        <hr />
                        <br />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: comment?.description,
                          }}
                        ></p>
                      </div>
                    </div>
                  )
                );
              }
            })}
          {props.comments.length == 0 && props.auth.uid && (
            <div className="noCommentNote text-center d-flex justify-content-center mx-auto mt-5">
              <i className="far fa-comment-dots"></i>&#160; Be the first to
              comment.
            </div>
          )}
        </div>
        {props.auth.uid && (
          <div id="commentEditor">
            <p className="text-center" id="errorText">
              <i className="fas fa-exclamation-triangle"></i> Your comment will
              be published after confirmation by the owner of the post.
            </p>
            <Editor
              // editorState={this.editorContent}
              wrapperClassName="rich-editor demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
            />
          </div>
        )}
        {props.auth.uid && (
          <div className="text-center mb-5">
            <button
              className="btn btn-danger mx-auto mb-5 d-inline-block"
              onClick={sendComment}
            >
              Send Comment
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteBlogFromDatabase,
  addCommentToDatabase,
  approveCommentFromDatabase,
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
    approveComments: state.comments.filter(
      (comment) => comment.blogId == props.match.params.id && comment.statu
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailsItem);
