import React, { Component } from "react";
import "./Scoreboard.css";

export default class Scoreboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="total-score">Score-- {this.props.score}</div>
          Correct Answers
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th >No</th>
                <th >Question</th>
                <th >Response</th>
                <th >Answer</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data
                .filter((val) => val.Response === val.Answer)
                .map((val,index) => (
                  <tr key={index}>
                    <td key="a">{val.no}</td>
                    <td key="b">{val.Question}</td>
                    <td key="c">{val.Response}</td>
                    <td key="d">{val.Answer}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          Incorrect Answers
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Question</th>
                <th>Response</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data
                .filter((val) => val.Response !== val.Answer)
                .map((val,index) => (
                  <tr key={index}>
                    <td key="e">{val.no}</td>
                    <td key="f">{val.Question}</td>
                    <td key="g">{val.Response}</td>
                    <td key="h">{val.Answer}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
