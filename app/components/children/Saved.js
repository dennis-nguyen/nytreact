import React, {Component} from 'react';

class Saved extends Component {
  render() {
    return (
      <div className="Saved col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">Saved</h3>
          </div>
          <div className="panel-body">
            Panel content
            {this.props.saved.url}
          </div>
        </div>
      </div>
    );
  }
}

export default Saved;
