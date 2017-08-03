import React, {Component} from 'react';
import SavedItem from "./SavedItem";

class Saved extends Component {
  render() {
    let savedItems;
    if(this.props.saved) {
      savedItems = this.props.saved.map((data,i) => {
          return (
          <SavedItem key={i} index={i} article={data} requeryDB={this.props.requeryDB}/>
        );
      });
    }
    return (
      <div className="Saved col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">Saved</h3>
          </div>
          <div className="panel-body pre-scrollable">
            {savedItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Saved;
