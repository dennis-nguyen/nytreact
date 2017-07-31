import React, {Component} from 'react';
import ResultsItem from "./ResultsItem";

class Results extends Component {
  render() {
    let resultItems;
    if(this.props.resultsNYT) {
      resultItems = this.props.resultsNYT.map((data,i) => {
        return (
          <ResultsItem key={i} article={data}/>
        );
      });
    }
    return (
      <div className="Results">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">Results</h3>
          </div>
          <div className="panel-body">
            {resultItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
