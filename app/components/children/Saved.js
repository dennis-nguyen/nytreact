import React, {Component} from 'react';
import SavedItem from "./SavedItem";

class Saved extends Component {
  render() {
    let savedItems;
    console.log(this.props.saved);
    if(this.props.saved) {
      savedItems = this.props.saved.map((data,i) => {
          return (
          <SavedItem key={i} index={i} article={data}/>
        );
      });
    }
    return (
      <div className="Saved col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">Saved</h3>
          </div>
          <div className="panel-body">
            {savedItems}
            {this.props.saved.url}
          </div>
        </div>
      </div>
    );
  }
}

export default Saved;
