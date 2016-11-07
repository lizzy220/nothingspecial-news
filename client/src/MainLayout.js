import React, { Component } from 'react';
import './MainLayout.css';
import HeaderBar from './HeaderBar';
import request from 'superagent';

class MainLayout extends Component {
  constructor(){
    super();
    this.state = {articles: [],
                  postArticles: [],
                  savedArticles: [],
                  clickedArticleId: '',
                  clickedArticle: {}
                  };
    this.handleArticlesLoad = this.handleArticlesLoad.bind(this);
    this.handlePostSavedArticlesLoad = this.handlePostSavedArticlesLoad.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleArticleClick=this.handleArticleClick.bind(this);
  }

  handleNewPost(newArticle){
    this.setState({articles: [newArticle].concat(this.state.articles),
                  postArticles: [newArticle].concat(this.state.postArticles)});
    this.handleArticleClick(newArticle._id);
  }

  handleArticlesLoad(articles){
    this.setState({articles: articles});
  }

  handlePostSavedArticlesLoad(articles){
    this.setState({postArticles: articles});
    this.setState({savedArticles: articles});
  }

  handleArticleClick(articleId){
    if(articleId !== ''){
      var self = this;
        request
         .get('/api/articles/article/' + articleId)
         .set('Accept', 'application/json')
         .end(function(err, res) {
           if (err || !res.ok) {
             console.log('fail to load article', err);
           } else {
             self.setState({clickedArticle: res.body,
                            clickedArticleId: articleId});
           }
         });
    }else{
      this.setState({clickedArticleId: articleId});
    }
  }

  getChildContext() {
    return {
      location: this.props.location
    }
  }

  render() {
    return (
      <div className="MainLayout">
        <HeaderBar onSearchInput={this.handleArticlesLoad} onNewPost={this.handleNewPost}/>

        <main>
          {this.props.children && React.cloneElement(this.props.children, {
            articles: this.state.articles,
            postArticles: this.state.postArticles,
            savedArticles: this.state.savedArticles,
            clickedArticleId: this.state.clickedArticleId,
            clickedArticle: this.state.clickedArticle,
            onArticlesLoad: this.handleArticlesLoad,
            onPostSavedArticlesLoad: this.handlePostSavedArticlesLoad,
            onArticleClick: this.handleArticleClick
          })}
        </main>
      </div>
    );
  }
}

MainLayout.childContextTypes = {
    location: React.PropTypes.object
}

export default MainLayout;
