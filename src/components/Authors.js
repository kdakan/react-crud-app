import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import * as api from "../api";
import querystring from "querystring";
import Paginator from "./Paginator";

class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedSearchTerm: "",
      authors: [],
      currentPageAuthors: [],
      hasError: false
    };

    this.setCurrentPageItems = this.setCurrentPageItems.bind(this);
  }

  fetchAuthors(searchTerm) {
    api
      .getAuthors()
      .then(json => {
        if (searchTerm) {
          json = json.filter(a => a.name.includes(searchTerm));
        }
        this.setState({ fetchedSearchTerm: searchTerm });
        this.setState({ authors: json });
        this.setState({ hasError: false });
        this.setState({ currentPage: 1 });
      })
      .catch(error => {
        console.log(error);
        this.setState({ hasError: true });
      });
  }

  componentDidMount() {
    const searchTerm = this.getSearchTerm();
    this.fetchAuthors(searchTerm);
  }

  componentDidUpdate() {
    const searchTerm = this.getSearchTerm();
    if (this.state.fetchedSearchTerm != searchTerm)
      this.fetchAuthors(searchTerm);
  }

  getSearchTerm() {
    return querystring.parse(this.props.location.search)["?search"];
  }

  setCurrentPageItems(currentPageItems) {
    this.setState({ currentPageAuthors: currentPageItems });
  }

  render() {
    const rows = this.state.currentPageAuthors.map(a => {
      return (
        <tr key={a.id}>
          <td>{a.id}</td>
          <td>{a.name}</td>
          <td className="text-center">
            <NavLink
              to={`/authors/${a.id}/view`}
              className="btn btn-sm btn-primary"
            >
              View
            </NavLink>{" "}
            <NavLink
              to={`/authors/${a.id}/edit`}
              className="btn btn-sm btn-warning"
            >
              Edit
            </NavLink>{" "}
            <NavLink
              to={`/authors/${a.id}/delete`}
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
        <h4>Authors</h4>
        <p />
        <table className="table table-striped table-bordered table-hover table-sm table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>
                <div className="text-right">
                  <NavLink
                    to={`/authors/0/add`}
                    className="btn btn-sm btn-success"
                  >
                    Add
                  </NavLink>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <Paginator
          items={this.state.authors}
          setCurrentPageItems={this.setCurrentPageItems}
        />
      </div>
    );
  }
}

export default Authors;
