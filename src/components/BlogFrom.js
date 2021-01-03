import React, { Component } from "react";
import { MyEditor } from "../components/myEditor";
import "./App.css";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const options = [
  {
    label: "Java",
    value: "Java",
  },
  {
    label: "Javascript",
    value: "Javascript",
  },
  {
    label: "React",
    value: "React",
  },
  {
    label: "Angular",
    value: "Angular",
  },
  {
    label: "Ruby on Rails",
    value: "Ruby on Rails",
  },
  {
    label: "Html",
    value: "Html",
  },
  {
    label: "Css",
    value: "Css",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export default class BlogFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({
      description,
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title || !this.state.description) {
      this.setState({ error: "Please fill in all fields!" });
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

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          {this.state.error && (
            <p className="text-center">{this.state.error}</p>
          )}
          <form onSubmit={this.onSubmit}>
            <div className="col-lg-12">
              <div className="ml-5">
                <input
                  placeholder="Enter the blog title..."
                  value={this.state.title}
                  onChange={this.onTitleChange}
                  className="w-100 mx-auto"
                />
              </div>
              <div>
                <textarea
                  placeholder="enter description"
                  value={this.state.description}
                  onChange={this.onDescriptionChange}
                  id="editor"
                ></textarea>
              </div>
              <div className="select-container">
                <select
                  value={this.state.category}
                  onChange={this.handleChange}
                >
                  {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="app input-group">
                <MyEditor
                  // value={this.state.description}
                  // onChange={(event) => {
                  //   this.setState({
                  //     description: event,
                  //   });
                  //   console.log(event);
                  // }}
                  title={this.state.title}
                  error={this.state.error}
                />
              </div>
              <div className="text-center mb-5">
                <button type="submit" className="btn btn-danger">
                  Save Blog
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
