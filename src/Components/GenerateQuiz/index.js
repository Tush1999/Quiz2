import React, { Component } from "react";
import Quiz from "../Quiz/index";
import Form from "./Form";
import './style.css'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  handleUpdate = (item) => {
    this.setState({ items: [...this.state.items, item] });
  };
  render() {
    let quiz = this.state.items.map((value,index) => (
      <Quiz
        min={value.min}
        max={value.max}
        question={value.question}
        add={value.add }
        subtract={value.subtract}
        multiply={value.multiply }
        divide={value.divide }
        timer={value.timer}
        key={index}
      />
    ));
    return (
      <>
        <Form addForm={this.handleUpdate} />
        <div className="form-div">
        {quiz}
        </div>
      </>
    );
  }
}
