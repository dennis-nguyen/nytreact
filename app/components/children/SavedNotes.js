import React, {Component} from 'react';

class SavedNotes extends Component {
  render() {
    return (

        <div className="col-lg-12">
            <div className="col-lg-11">{this.props.notes.note}</div>
            <button className="col-lg-1 btn btn-danger btn-xs" onClick={()=>this.props.deleteNote(this.props.notes._id)}>X</button>
        </div>
    );
  }
}

export default SavedNotes;
