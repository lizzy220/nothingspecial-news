import React, { Component } from 'react';
import './MainLayout.css';
import HeaderBar from './HeaderBar';
import {HomeBodyContainer,UserAccountBodyContainer} from './BodyContainer';

class MainLayout extends Component {
  constructor(){
    super();
    this.state = {articles: [],
                  clickedArticleId: ''
                  };
    this.handleArticlesLoad = this.handleArticlesLoad.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
  }

  handleNewPost(newArticle){
    this.setState({articles: [newArticle].concat(this.state.articles)});
    this.setState({clickedArticleId: newArticle._id});
  }

  handleArticlesLoad(articles){
    this.setState({articles: articles});
  }

  render() {
    return (
      <div className="MainLayout">
        <HeaderBar onSearchInput={this.handleArticlesLoad} onNewPost={this.handleNewPost}/>

        <main>
          <HomeBodyContainer articles={this.state.articles} onArticlesLoad={this.handleArticlesLoad} onArticleClick={this.handleArticleClick}/>
        </main>
      </div>
    );
  }
}

export default MainLayout;
