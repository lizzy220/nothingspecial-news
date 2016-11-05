import React, { Component } from 'react';
import { Accordion, Icon} from 'semantic-ui-react'

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
      <div className="ui middle aligned animated list">
        {this.props.articles.map((article)=><ArticleItem key={article.id} articleInfo={article} onArticleClick={this.handleClick} />)}
      </div>
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
      <div className="item" onClick={this.handleClick}>{this.props.articleInfo.title}</div>
    );
  }
}

class PostSavedList extends Component{
  constructor(){
    super();
    this.handleArticleClick=this.handleArticleClick.bind(this);
  }

  handleArticleClick(articleId){
    this.props.onArticleClick(articleId);
  }

  render(){
    return(
      <Accordion>
        <Accordion.Title>
          <Icon name='dropdown' />
          Post Articles
        </Accordion.Title>
        <Accordion.Content>
          <ArticleItemsList onArticleClick={this.handleArticleClick} articles={this.props.postArticles} />
        </Accordion.Content>
        <Accordion.Title>
          <Icon name='dropdown' />
          Saved Articles
        </Accordion.Title>
        <Accordion.Content>
          <ArticleItemsList onArticleClick={this.handleArticleClick} articles={this.props.savedArticles} />
        </Accordion.Content>
      </Accordion>
    );
  }
}

module.exports={
  PostSavedList,
  ArticleItemsList
}
