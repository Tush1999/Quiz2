import React, { Component } from "react";
import './style.css'

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { min: "", max: "", question: "" ,add:"",subtract:"",divide:"",multiply:"",timer:""};
    this.initialState = this.state;
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
     if(e.target.type!=="number")
     this.setState({[e.target.name]:e.target.checked})
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addForm(this.state);
    this.setState(this.initialState);
  };
  render() {
    return (
      <div >
           <h1 className="text">Quiz Generation</h1>
          <div className="form">
          <br></br>
        <form onSubmit={this.handleSubmit}>
          <div >
              <div className="flex">
              <div>
          <label htmlFor="min" className="col-md-6 label-control d-inline-block">Min Limit</label>
          <input
            type="number"
            id="min"
            value={this.state.min}
            name="min"
            onChange={this.handleChange}
            required
            className="min-class"
          />
          </div>
          <div>
          <label htmlFor="max">Max Limit</label>
          <input
            type="number"
            id="max"
            value={this.state.max}
            name="max"
            onChange={this.handleChange}
            required
          />
          </div>
          </div>
          <div className="flex">
              <div>
          <label htmlFor="question">No of Questions</label>
          <input
            type="number"
            id="question"
            value={this.state.question}
            name="question"
            onChange={this.handleChange}
            required
          />
          </div>
          <div>
          <label htmlFor="timer">Timer</label>
          <input type="number" value={this.state.timer} id="timer" onChange={this.handleChange} name="timer"/>
          </div>
          </div>
          <div className="check-flex">
        <div className="operations">Operations</div>
           <div className="outer-flex">
          <label htmlFor="add">+</label> 
          <input type="checkbox" name="add" id="add" onChange={this.handleChange}/>
          </div>
          <div className="outer-flex">
          <label htmlFor="subtract">-</label>
          <input type="checkbox" name="subtract" id="subtract" onChange={this.handleChange}/>
          </div>
          
            <div className="outer-flex">
          <label htmlFor="divide">/</label>
          <input type="checkbox" name="divide" id="divide" onChange={this.handleChange}/>
          
          </div>
          <div className="outer-flex">
          <label htmlFor="multiply">*</label>
          <input type="checkbox" name="multiply" id="multiply" onChange={this.handleChange}/>
          </div>
          </div>
          <button>Submit</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}
