import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import * as api from "../api";
import alertTypes from "./alertTypes";

class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: {},
      hasError: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  fetchAuthor() {
    const id = Number(this.props.match.params.id);
    api
      .findAuthor(id)
      .then(json => {
        if (json) {
          this.setState({ author: json });
          this.setState({ hasError: false });
        } else this.setState({ hasError: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ hasError: true });
      });
  }

  componentDidMount() {
    if (this.props.match.params.operation !== "add") {
      this.fetchAuthor();
    }
  }

  handleNameChange(event) {
    const author = { ...this.state.author, name: event.target.value };
    this.setState({ author: author });
  }

  handleSaveClick(event) {
    event.preventDefault();
    // api.saveAuthor(this.state.author);
    this.props.alert(alertTypes.SUCCESS, "Saved successfully.");
    this.props.history.push("/authors");
  }

  handleDeleteClick(event) {
    event.preventDefault();
    api
      .getCoursesByAuthorName(this.state.author.name)
      .then(courses => {
        if (courses.length !== 0) {
          this.props.alert(
            alertTypes.WARNING,
            "Cannot delete author, because there are related courses!"
          );
        } else {
          // api.deleteAuthor(this.state.author);
          this.props.alert(alertTypes.SUCCESS, "Deleted successfully.");
          this.props.history.push("/authors");
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ hasError: true });
      });
  }

  render() {
    if (this.state.hasError) {
      return "An error occured, please retry.";
    }

    const deleteWarning =
      this.props.match.params.operation === "delete" ? (
        <div className="alert alert-danger col-8" role="alert">
          Are you sure you want to delete this?
        </div>
      ) : null;

    let operationButton = null;
    if (this.props.match.params.operation === "delete") {
      operationButton = (
        <button
          type="submit"
          className="btn btn-sm btn-danger"
          onClick={this.handleDeleteClick}
        >
          Delete
        </button>
      );
    } else if ("add|edit".includes(this.props.match.params.operation)) {
      operationButton = (
        <button
          type="submit"
          className="btn btn-sm btn-danger"
          onClick={this.handleSaveClick}
        >
          Save
        </button>
      );
    }

    const disabledProp = "add|edit".includes(this.props.match.params.operation)
      ? {}
      : { disabled: true };

    return (
      <>
        <p />
        <h4>Author</h4>
        <p />
        <form>
          <div className="form-group">
            <div className="col-4">
              <label htmlFor="name">Id</label>
              <input
                disabled
                type="text"
                className="form-control"
                value={this.state.author.id || ""}
              />
            </div>
            <div className="col-4">
              <label htmlFor="name">Name</label>
              <input
                {...disabledProp}
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={this.state.author.name || ""}
                onChange={this.handleNameChange}
              />
            </div>
          </div>
          <div className="col-8">
            {deleteWarning}
            {operationButton}{" "}
            <NavLink to="/authors" className="btn btn-sm btn-primary">
              Back
            </NavLink>
          </div>
        </form>
      </>
    );
  }
}

export default Author;
