import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { PreviewModal } from "./previewModal";

const getHtml = (editorState) =>
  draftToHtml(convertToRaw(editorState.getCurrentContent()));

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: props.title,
      error: props.error,
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  addDatabase = (e) => {
    e.preventDefault();
    if (!this.state.title || !this.state.description) {
      this.setState({ error: "Please fill in all fields!" });
    } else {
      this.setState({ error: "" });
      this.props.addDatabase({
        title: this.state.title,
        description: this.state.editorState,
        dateAdded: new Date().toLocaleDateString(),
      });
    }
  };

  render() {
    const { editorState } = this.state;
    console.log(this.props);
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="rich-editor demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          placeholder="The message goes here..."
          // contentState={this.editorState}
        />
        <h4>Underlying HTML</h4>
        <div className="html-view">{getHtml(editorState)}</div>
        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#previewModal"
          onClick={this.addDatabase}
        >
          Preview message
        </button>
        <PreviewModal output={getHtml(editorState)} />
      </div>
    );
  }
}

export { MyEditor };
