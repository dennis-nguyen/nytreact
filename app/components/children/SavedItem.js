import React, {Component} from 'react';

class SavedItem extends Component {
  
  render() {
    return (
      <div className="col-lg-12">
          <div className="row">
            <a href={this.props.article.url} target="_blank"> <div className="col-lg-11">{this.props.index + 1} - <strong>{this.props.article.title}</strong> </div> </a>
            <button className="btn btn-primary" >Save</button>
          </div>
      </div>
    );
  }
}

export default SavedItem;
