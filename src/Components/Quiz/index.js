import React, { Component } from "react";
import QuestionComponent from "../QuestionComponent/index";
import Scoreboard from "../Scoreboard/index";
import "./style.css";

export default class Quiz extends Component {
  static defaultProps = {
    operation: [],
    
  };
  
  constructor(props) {
    super(props);
    this.state = {
      correct_count: 0,
      incorrect_count: 0,
      operand_1: 0,
      operand_2: 0,
      index: 0,
      score: 0,
      question: 1,
      data: [],
      seconds: this.props.timer,
    };
  }
  generateQuestions = () => {
    let max=parseInt(this.props.max)
    let min=parseInt(this.props.min)
    let question_1 = Math.floor(Math.random() * (max-min+1))+min;
    let question_2 = Math.floor(Math.random() * (max-min+1))+min;
    let idx = Math.floor(Math.random() * this.props.operation.length);
    this.setState({
      operand_1: question_1,
      operand_2: question_2,
      index: idx,
    });
  };
  myInterval = () =>
    (this.a = setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        this.generateQuestions();
        this.setState({ question: this.state.question + 1, seconds: this.props.timer });
      }
      if (this.state.question > this.props.question) {
        clearInterval(this.a);
        this.setState({ seconds: null });
      }
    }, 1000));

  Timer = (x) => {
    this.setState({ seconds: x }, this.myInterval);
  };
  makeOperation=()=>{
    if(this.props.add){
      this.props.operation.push("+")
    }
    if(this.props.subtract){
      this.props.operation.push("-")
    }
    if(this.props.multiply){
      this.props.operation.push("*")
    }
    if(this.props.divide){
      this.props.operation.push("/")
    }
    console.log(this.props.operation)
  }
  componentDidMount = () => {
    this.generateQuestions();
    this.makeOperation();
    this.Timer(this.props.timer);
  };
  check_answer = (value, ans) => {
    if (parseFloat(value).toFixed(2) === parseFloat(ans).toFixed(2)) {
      this.setState({
        score: this.state.score + 1,
        correct_count: this.state.correct_count++,
      });
    } else {
      this.setState({
        incorrect_count: this.state.incorrect_count++,
      });
    }
    this.setState({
      question: this.state.question + 1,
      data: [
        ...this.state.data,
        {
          no: this.state.question,
          Question: `${this.state.operand_1} ${
            this.props.operation[this.state.index]
          } ${this.state.operand_2}`,
          Response: parseFloat(value).toFixed(2),
          Answer: parseFloat(ans).toFixed(2),
        },
      ],
    });
    this.generateQuestions();
    clearInterval(this.a);
    this.Timer(this.props.timer);
  };
  render() {
    return (
      <>
        <div className={this.state.question > this.props.question ? "deactive" : null}>
          <div className="container">
            <div className="inner-container">
              <div className="heading"> Details Of Quiz </div>
              <div className="timer">Remaining Time: {this.state.seconds}</div>
              <div className="first-flex">
                <div> Minimum Limit: {this.props.min} </div>
                <div className="upper-text"> Maximum Limit: {this.props.max} </div>
              </div>
              <div className="second-flex">
                <p> Timer: {this.props.timer} </p> <p> Question Count: {this.props.question} </p>
              </div>
            </div>
            <div className="question">Question No - {this.state.question} </div>
            <QuestionComponent
              operand_1={this.state.operand_1}
              operand_2={this.state.operand_2}
              operation={this.props.operation[this.state.index]}
              answer={this.check_answer}
            />
            <p className="display-score"> Your Score is {this.state.score} </p>
          </div>
        </div>
        <div className={this.state.question > this.props.question ? "container" : null}>
          {this.state.question > this.props.question ? (
            <Scoreboard
              correct_count={this.state.correct_count}
              incorrect_count={this.state.incorrect_count}
              data={this.state.data}
              score={this.state.score}
            />
          ) : null}
        </div>
      </>
    );
  }
}
