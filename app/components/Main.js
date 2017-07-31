import React, {Component} from 'react';
import Search from './children/Search';
import Results from './children/Results';
import Saved from './children/Saved';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    // this.handleChange = this
    //   .handleChange
    //   .bind(this);

    this.grabNYT = this.grabNYT.bind(this);
    // this.resultsNYT = this.grabNYT.bind(this);
  }
  grabNYT(articles) {
    this.setState({ articles: articles });
    console.log(this.state.articles);
  }
  
  // resultsNYT() {

  // }

  // componentDidUpdate() {

  // }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">
          New York Times Article Scrubber
        </h1>
        <h4 className="text-center">
          Search for and annotate articles of interest!
        </h4>
        <Search grabNYT={this.grabNYT}/>
        <Results resultsNYT={this.state.articles}/>
        <Saved/>
      </div>
    );
  }
}

export default Main;
