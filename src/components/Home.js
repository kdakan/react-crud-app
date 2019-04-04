import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <p />
        <h4>React CRUD App</h4>
        <p />
        This is a React CRUD app which I've built for demonstration in my React
        & Redux tutorial{" "}
        <a href="https://kdakan.github.io/Tutorial-On-React-React-Router-and-Redux/">
          here
        </a>
        .
        <p />
        This app offers paginated and searchable lists, edit forms, client-side
        routing, and an api layer, with Bootstrap
        components like date picker and notifications.
        <p />
        Some of the libraries used in this project are:
        <ul>
          <li>react</li>
          <li>react-router-dom</li>
          <li>bootstrap</li>
          <li>react-datepicker</li>
          <li>react-bs-notifier</li>
        </ul>
        <p />
        If you're interested in the same app without Redux, see my other app{" "}
        <a href="https://github.com/kdakan/react-redux-crud-app/">here</a>
      </div>
    );
  }
}

export default Home;