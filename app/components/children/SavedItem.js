import React, {Component} from 'react';
import helpers from "../utils/helpers";

class SavedItem extends Component {

  deleteFromDb () {
    console.log("delete working")
    let currentArticle = {
      title: this.props.article.title,
      date: this.props.article.date,
      url: this.props.article.url
    }
    helpers.deleteFromDB(currentArticle).then((response)=>{
      this.props.requeryDB(currentArticle);
    });
  } 

  render() {
    return (
      <div className="col-lg-12" id={"saved" + this.props.index}>
          <div className="row">
            <a href={this.props.article.url} target="_blank"> <div className="col-lg-11">{this.props.index + 1} - <strong>{this.props.article.title}</strong> </div> </a>
            <button className="btn btn-danger" onClick={()=>{this.deleteFromDb()}}>Remove</button>
          </div>
      </div>
    );
  }
}

export default SavedItem;
