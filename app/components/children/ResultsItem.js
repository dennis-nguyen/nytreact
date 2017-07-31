import React, {Component} from 'react';

class ResultsItem extends Component {
  render() {
    return (
      <li key={this.props.i}>
          {this.props.article.snippet}
      </li>
    );
  }
}

export default ResultsItem;
