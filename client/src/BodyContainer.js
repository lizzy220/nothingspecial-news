import React, { Component } from 'react';
import ArticleItemsList, {PostSavedList} from './ArticleList'

class BodyContainer extends Component{
  constructor(){
    super();
    this.state={clickedArticleId: ''};
    this.handleArticleClick=this.handleArticleClick.bind(this);
  }

  handleArticleClick(articleId){
    this.setState({clickedArticleId: articleId});
  }

  render(){
    var postArticles=[{'id': '1', 'title': 'java'}];
    var savedArticles=[{'id': '2', 'title': 'C++'}];
    return(
      //<ArticleItemsList articles={this.props.articles} onArticleClick={this.handleArticleClick}/>
        <PostSavedList postArticles={postArticles} savedArticles={savedArticles} onArticleClick={this.handleArticleClick} />
    );
  }
}

export default BodyContainer;
