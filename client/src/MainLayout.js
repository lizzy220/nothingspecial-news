import React, { Component } from 'react';
import './MainLayout.css';
import HeaderBar from './HeaderBar';
import {HomeBodyContainer,UserAccountBodyContainer} from './BodyContainer';
import request from 'superagent';

class MainLayout extends Component {
  constructor(){
    super();
    this.state = {articles: [],
                  clickedArticleId: '',
                  clickedArticle: {}
                  };
    this.handleArticlesLoad = this.handleArticlesLoad.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleArticleClick=this.handleArticleClick.bind(this);
  }

  handleNewPost(newArticle){
    this.setState({articles: [newArticle].concat(this.state.articles)});
    this.handleArticleClick(newArticle._id);
  }

  handleArticlesLoad(articles){
    this.setState({articles: articles});
  }

  handleArticleClick(articleId){
    this.setState({clickedArticleId: articleId});
    var self = this;
      request
       .get('/api/articles/article/' + articleId)
       .set('Accept', 'application/json')
       .end(function(err, res) {
         if (err || !res.ok) {
           console.log('fail to load article', err);
         } else {
           console.log(res.body.content);
           self.setState({clickedArticle: res.body.content});
         }
       });
  }

  render() {
    return (
      <div className="MainLayout">
        <HeaderBar onSearchInput={this.handleArticlesLoad} onNewPost={this.handleNewPost}/>

        <main>
          <HomeBodyContainer
            articles={this.state.articles}
            clickedArticleId={this.state.clickedArticleId}
            clickedArticle={this.state.clickedArticle}
            onArticlesLoad={this.handleArticlesLoad}
            onArticleClick={this.handleArticleClick}/>
        </main>
      </div>
    );
  }
}

export default MainLayout;
