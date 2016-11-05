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
        {this.props.articles.map((article)=><ArticleItem key={article.id} articleInfo={article} onArticleClick={this.handleClick} />)}
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
      <li onClick={this.handleClick}>{this.props.articleInfo.title}</li>
    );
  }
}

export default ArticleItemsList;
