import React, { Component } from 'react';
import './MainLayout.css';
import HeaderBar from './HeaderBar';
import {HomeBodyContainer,UserAccountBodyContainer} from './BodyContainer';

class MainLayout extends Component {
  constructor(){
    super();
    this.state = {articles: []
                  };
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount(){
    //To Do: read top 20 articles from database as initial articles
  }

  handleSearchInput(articles){
    this.setState({articles: articles});
  }

  render() {
    return (
      <div className="MainLayout">
        <HeaderBar onSearchInput={this.handleSearchInput} />

        <main>
          <HomeBodyContainer articles={this.state.articles}/>
        </main>
      </div>
    );
  }
}

export default MainLayout;
