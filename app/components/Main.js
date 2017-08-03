import React, {Component} from 'react';
import Search from './children/Search';
import Results from './children/Results';
import Saved from './children/Saved';
import helpers from "./utils/helpers";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      savedArticle: []
    };

    this.grabNYT = this.grabNYT.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.requeryDB = this.requeryDB.bind(this);
  }

  componentDidMount() {
    helpers.queryFromDB().then((response)=>{
      console.log(response);
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
          console.log(response);
          this.setState({ savedArticle: response.data });
        });
      });
    } else {
      alert("Article already saved");
    }
  }

  requeryDB(article) {
    let index = this.state.savedArticle.findIndex(x => x.title == article.title);
    let currentSaved = this.state.savedArticle;
    currentSaved.splice(index, 1);

    this.setState({ savedArticle: currentSaved });
    console.log(this.state.savedArticle)
  }

  render() {
    const isLoggedIn = this.state.articles;
    return (
      <div className="col-lg-12">
        <h1 className="text-center">
          New York Times Article Scrubber
        </h1>
        <h4 className="text-center">
          Search for and annotate articles of interest!
        </h4>
        <Search grabNYT={this.grabNYT}/>
        <Results resultsNYT={this.state.articles} saveArticle={this.saveArticle}/>
        <Saved saved={this.state.savedArticle} requeryDB={this.requeryDB}/>
      </div>
    );
  }
}

export default Main;
