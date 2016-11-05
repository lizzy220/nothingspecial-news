import React, { Component } from 'react';
import ArticleItemsList from './ArticleList'

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
    return(
      <ArticleItemsList articles={this.props.articles} onArticleClick={this.handleArticleClick}/>
    );
  }
}

export default BodyContainer;
