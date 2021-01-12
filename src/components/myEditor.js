import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import { connect } from "react-redux";

var options;

const getHtml = (editorState) =>
  draftToHtml(convertToRaw(editorState.getCurrentContent()));

class MyEditor extends Component {
  constructor(props) {
    options = props.categories;
    if (props.blog) {
      var description = htmlToDraft(props.blog.description);
    }
    super(props);
    this.state = {
      editorState: props.blog
        ? EditorState.createWithContent(
            ContentState.createFromBlockArray(description.contentBlocks)
          )
        : EditorState.createEmpty(),
      title: props.blog ? props.blog.title : "",
      description: props.blog ? props.blog.description : "",
      displayName: props.blog ? props.blog.displayName : props.auth.displayName,
      category: props.blog ? props.blog.category : "",
      error: props.blog ? props.blog.error : "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ category: e.target.value });
  }

  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({
      title,
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (
      !this.state.title ||
      !this.state.description ||
      this.state.category === "Select" ||
      this.state.category === ""
    ) {
      this.setState({ error: "Please fill in all fields !" });
    } else {
      this.setState({ error: "" });
      this.props.onSubmit({
        title: this.state.title,
        description: this.state.description,
        displayName: this.state.displayName,
        category: this.state.category,
        dateAdded: new Date().toLocaleDateString(),
      });
    }
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      description: getHtml(editorState),
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            {this.state.error && (
              <p className="text-center" id="errorText">
                {this.state.error}
              </p>
            )}
            <form onSubmit={this.onSubmit}>
              <div className="col-lg-12">
                <div className="ml-1">
                  <input
                    placeholder="Enter the blog title..."
                    value={this.state.title}
                    onChange={this.onTitleChange}
                    className="w-100 mx-auto form-control my-3"
                  />
                </div>
                <div className="select-container text-center">
                  <label>Select Category </label>{" "}
                  <select
                    value={this.state.category}
                    onChange={this.handleChange}
                    className="mb-5 mt-3 "
                  >
                    {options.map((option) => (
                      <option value={option.categoryName}>
                        {option.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <Editor
                  editorState={editorState}
                  wrapperClassName="rich-editor demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                />
                <div className="text-center my-5">
                  <button type="submit" className="btn btn-danger">
                    Save Blog
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(MyEditor);
