import React, {Component} from 'react';
import helpers from "../utils/helpers";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      start: "",
      end: ""
    };
    this.handleChange = this
      .handleChange
      .bind(this);

    this.testSubmit = this
      .testSubmit
      .bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  testSubmit(e) {
    e.preventDefault();
    let term = this.state.topic;
    let start = this.state.start;
    let end = this.state.end;
    console.log(this.state.topic);
    console.log(this.state.start);
    console.log(this.state.end);

    helpers
      .queryNYT(term, start, end)
      .then((data) => {
        this.props.grabNYT(data.data.response.docs);
      });

  }

  render() {
    return (
      <div className="Search">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">Search</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.testSubmit}>
              <div className="form-group">
                <h4 className="text-center">Topic</h4>
                <input
                  type="text"
                  className="form-control text-center"
                  name="topic"
                  value={this.state.topic}
                  onChange={this.handleChange}
                  required/>
                <h4 className="text-center">Start Year</h4>
                <input
                  type="text"
                  className="form-control text-center"
                  name="start"
                  value={this.state.start}
                  onChange={this.handleChange}
                  required/>
                <h4 className="text-center">End Year</h4>
                <input
                  type="text"
                  className="form-control text-center"
                  name="end"
                  value={this.state.end}
                  onChange={this.handleChange}
                  required/>
                <br/>
                <button className="btn btn-primary center-block" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
