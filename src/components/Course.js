import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import * as api from "../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import alertTypes from "./alertTypes";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      hasError: false
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  fetchCourse() {
    const id = Number(this.props.match.params.id);
    api
      .findCourse(id)
      .then(json => {
        if (json) {
          this.setState({ course: json });
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
      this.fetchCourse();
    }
  }

  handleTitleChange(event) {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course: course });
  }

  handleDateChange(date) {
    const course = { ...this.state.course, date: date };
    this.setState({ course: course });
  }

  handleLevelChange(event) {
    const course = { ...this.state.course, level: event.target.value };
    this.setState({ course: course });
  }

  handleSaveClick(event) {
    event.preventDefault();
    // api.saveCourse(this.state.course);
    this.props.alert(alertTypes.SUCCESS, "Saved successfully.");
    this.props.history.push("/courses");
  }

  handleDeleteClick(event) {
    event.preventDefault();
    // api.deleteCourse(this.state.course);
    this.props.alert(alertTypes.SUCCESS, "Deleted successfully.");
    this.props.history.push("/courses");
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
        <h4>Course</h4>
        <p />
        <form>
          <div className="form-group">
            <div className="col-6">
              <label htmlFor="name">Id</label>
              <input
                disabled
                type="text"
                className="form-control"
                value={this.state.course.id || ""}
              />
            </div>
            <div className="col-6">
              <label htmlFor="title">Title</label>
              <input
                {...disabledProp}
                type="text"
                className="form-control"
                placeholder="Enter title"
                value={this.state.course.title || ""}
                onChange={this.handleTitleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="date">Date</label>
              <DatePicker
                {...disabledProp}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                selected={this.state.course.date || ""}
                onChange={this.handleDateChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="level">Level</label>
              <select
                {...disabledProp}
                className="form-control"
                placeholder="Select level"
                value={this.state.course.level || ""}
                onChange={this.handleLevelChange}
              >
                <option value="" disabled>
                  Please select
                </option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
          <div className="col-8">
            {deleteWarning}
            {operationButton}{" "}
            <NavLink to="/courses" className="btn btn-sm btn-primary">
              Back
            </NavLink>
          </div>
        </form>
      </>
    );
  }
}

export default Course;
