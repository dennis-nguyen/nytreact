import React, {Component} from 'react';

class ResultsItem extends Component {


  render() {
    return (
      <div className="col-lg-12">
          <div className="row">
            <a href={this.props.article.web_url} target="_blank"> <div className="col-lg-11">{this.props.index + 1} - <strong>{this.props.article.headline.main}</strong> </div> </a>
            <button className="btn btn-primary" onClick={()=>this.props.saveArticle({ "title": this.props.article.headline.main, "date": this.props.article.pub_date, "url": this.props.article.web_url})}>Save</button>
          </div>
      </div>
    );
  }
}

export default ResultsItem;
