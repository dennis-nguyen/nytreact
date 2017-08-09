import React, {Component} from 'react';
import Search from './children/Search';
import Results from './children/Results';
import Saved from './children/Saved';
import helpers from "./utils/helpers";
import Alert from "./children/Alert";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      savedArticle: [],
      alertVisible: false
    };

    this.grabNYT = this.grabNYT.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.updateSaved = this.updateSaved.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  componentDidMount() {
    helpers.queryFromDB().then((response)=>{
        this.setState({ savedArticle: response.data });
      });
  }
  grabNYT(articles) {
    this.setState({ articles: articles });
  }
  
  saveArticle(article) {
    let index = this.state.savedArticle.findIndex(x => x.title == article.title);
    let currentSaved = this.state.savedArticle;
    if(index == -1) {
      helpers.saveToDB(article).then((response)=>{
        helpers.queryFromDB().then((response)=>{
          this.setState({ savedArticle: response.data });
        });
      });
    } else {
      this.setState({ alertVisible: true });
    }
  }

  updateSaved(article) {
    let index = this.state.savedArticle.findIndex(x => x.title == article.title);
    let currentSaved = this.state.savedArticle;
    currentSaved.splice(index, 1);
    this.setState({ savedArticle: currentSaved });
  }

  hideAlert() {
    this.setState({ alertVisible: false });
  }
  render() {
    return (
        <div className="col-lg-12">
          <h1 className="text-center">
            New York Times Article Searcher
          </h1>
          <h4 className="text-center">
            Search for and annotate articles of interest!
          </h4>
          <Alert alertVisible={this.state.alertVisible} alertHide={this.hideAlert}/>
          <Search grabNYT={this.grabNYT}/>
          {this.state.articles.length > 0 &&
          <Results resultsNYT={this.state.articles} saveArticle={this.saveArticle} /> 
          }
          {this.state.savedArticle.length > 0 &&
          <Saved saved={this.state.savedArticle} updateSaved={this.updateSaved} />
          }
        </div>
    );
  }
}

export default Main;
