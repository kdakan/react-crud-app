import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import * as api from "../api";
import querystring from "querystring";
import Paginator from "./Paginator";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedSearchTerm: "",
      courses: [],
      currentPageCourses: [],
      hasError: false
    };

    this.setCurrentPageItems = this.setCurrentPageItems.bind(this);
  }

  fetchCourses(searchTerm) {
    api
      .getCourses()
      .then(json => {
        if (searchTerm) {
          json = json.filter(a => a.title.includes(searchTerm));
        }
        this.setState({ fetchedSearchTerm: searchTerm });
        this.setState({ courses: json });
        this.setState({ hasError: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ hasError: true });
      });
  }

  componentDidMount() {
    const searchTerm = this.getSearchTerm();
    this.fetchCourses(searchTerm);
  }

  componentDidUpdate() {
    const searchTerm = this.getSearchTerm();
    if (this.state.fetchedSearchTerm != searchTerm)
      this.fetchCourses(searchTerm);
  }

  getSearchTerm() {
    return querystring.parse(this.props.location.search)["?search"];
  }

  setCurrentPageItems(currentPageItems) {
    this.setState({ currentPageCourses: currentPageItems });
  }

  render() {
    const rows = this.state.currentPageCourses.map(course => {
      return (
        <tr key={course.id}>
          <td>{course.id}</td>
          <td>{course.title}</td>
          <td>{course.date}</td>
          <td>{course.level}</td>
          <td className="text-center">
            <NavLink
              to={`/courses/${course.id}/view`}
              className="btn btn-sm btn-primary"
            >
              View
            </NavLink>{" "}
            <NavLink
              to={`/courses/${course.id}/edit`}
              className="btn btn-sm btn-warning"
            >
              Edit
            </NavLink>{" "}
            <NavLink
              to={`/courses/${course.id}/delete`}
              className="btn btn-sm btn-danger"
            >
              Delete
            </NavLink>
          </td>
        </tr>
      );
    });

    if (this.state.hasError) {
      return "An error occured, please retry.";
    }

    return (
      <div className="table-responsive">
        <p />
        <h4>Courses</h4>
        <p />
        <table className="table table-striped table-bordered table-hover table-sm table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Date</th>
              <th>Level</th>
              <th className="text-right">
                <NavLink
                  to={`/courses/0/add`}
                  className="btn btn-sm btn-success"
                >
                  Add
                </NavLink>{" "}
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <Paginator
          items={this.state.courses}
          setCurrentPageItems={this.setCurrentPageItems}
        />
      </div>
    );
  }
}

export default Courses;
