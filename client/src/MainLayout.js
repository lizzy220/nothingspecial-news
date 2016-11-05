import React, { Component } from 'react';
import './MainLayout.css';
import HeaderBar from './HeaderBar';
import BodyContainer from './BodyContainer';

class MainLayout extends Component {
  constructor(){
    super();
    this.state = {articles: []};
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount(){
    //read top20 articles from database
  }

  handleSearchInput(articles){
    this.setState({articles: articles});
  }

  render() {
    return (
      <div className="MainLayout">
        <div className="MainLayout__header">
          <HeaderBar onSearchInput={this.handleSearchInput} />
        </div>

        <main>
          <BodyContainer articles={this.state.articles}/>
        </main>
      </div>
    );
  }
}

export default MainLayout;
