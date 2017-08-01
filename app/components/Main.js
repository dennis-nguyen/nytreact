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
      savedArticle: {}
    };
    // this.handleChange = this
    //   .handleChange
    //   .bind(this);

    this.grabNYT = this.grabNYT.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
  }
  grabNYT(articles) {
    this.setState({ articles: articles });
    console.log(this.state.articles);
  }
  
  saveArticle(article) {
    console.log(article);
    helpers.saveToDB(article).then((response)=>{
      // console.log(response.config.data);
      this.setState({ savedArticle: article });
    });
    // this.setState({ savedArticle: article });
    // console.log(this.state.savedArticle);
  }
  // resultsNYT() {

  // }

  // componentDidUpdate() {

  // }

  render() {
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
        <Saved saved={this.state.savedArticle}/>
      </div>
    );
  }
}

export default Main;
