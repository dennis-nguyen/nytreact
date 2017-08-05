import React, {Component} from 'react';
import helpers from "../utils/helpers";
import SavedNotes from "./SavedNotes";

class SavedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentInput: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNotes = this.addNotes.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  
  componentDidMount() {
    console.log("component did mount")
    helpers.queryNotes(this.props.article._id).then((response)=>{
      this.setState({ notes: response.data });

    });
  }
  handleChange(e) {
    this.setState({ currentInput: e.target.value });
    console.log(this.state.currentInput);
  }

  addNotes() {
    let note = {
      id: this.props.article._id,
      note: this.state.currentInput
    }
    helpers.addNotes(note).then((response)=>{
      helpers.queryNotes(this.props.article._id).then((response)=>{
        this.setState({ notes: response.data });
        this.setState({ currentInput: ""});
        });
    });
  }

  deleteFromDb () {
    let currentArticle = {
      title: this.props.article.title,
      date: this.props.article.date,
      url: this.props.article.url
    }
    helpers.deleteFromDB(currentArticle).then((response)=>{
      this.props.updateSaved(currentArticle);
    });
  } 
  
  deleteNote (id) {
    helpers.deleteNote(id);
    let index = this.state.notes.findIndex(x => x._id == id);
    let currentSaved = this.state.notes;
    currentSaved.splice(index, 1);
    this.setState({ notes: currentSaved });
  }

  render() {
    let savedNotes;
    if(this.state.notes) {
      savedNotes = this.state.notes.map((data,i) => {
          return (
          <SavedNotes key={i} index={i} notes={data} deleteNote={this.deleteNote}/>
        );
      });
    }
    return (
      <div className="col-lg-12" id={"saved" + this.props.index}>
        <div className="Results col-lg-12">
          <div className="panel panel-default">
            <div className="panel-heading col-lg-12">
              <button className="btn btn-success col-lg-1 btn-xs" data-toggle="collapse" data-target={"#" + this.props.index}>Notes</button><div className="panel-title text-center col-lg-10"><a href={this.props.article.url} target="_blank"> {this.props.index + 1} - {this.props.article.title} </a></div> <button className="btn btn-danger col-lg-1 btn-xs" onClick={()=>{this.deleteFromDb()}}>Remove</button>
            </div>
            <div className="panel-body collapse" id={this.props.index}>
              <hr />
              <div className={"notes" + this.props.index}>  
                {savedNotes}
                <div className="form-group col-lg-12">
                  <input className="form-control input-sm" id="inputsm" type="text" onChange={this.handleChange} value={this.state.currentInput} />
                  <button className="col-lg-1 btn btn-primary btn-xs" type="button" onClick={this.addNotes}>Add Note</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SavedItem;
