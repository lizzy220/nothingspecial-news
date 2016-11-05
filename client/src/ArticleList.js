import React, { Component } from 'react';

class ArticleItemsList extends Component{
  constructor(){
    super();
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(articleId){
    this.props.onArticleClick(articleId);
  }

  render(){
    return(
      <ul>
        {this.state.articles.map((article)=><ArticleItem articleInfo={article} onArticleClick={this.handleClick} />)}
      </ul>
    );
  }
}

class ArticleItem extends Component{
  constructor(){
    super();
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(){
    this.props.onArticleClick(this.props.articleInfo.id);
  }

  render(){
    return(
      <li key={this.props.articleInfo.id} onclick={this.handleClick}>{this.props.articleInfo.title}</li>
    );
  }
}

export default ArticleItemsList;
