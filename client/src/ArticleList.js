import React, { Component } from 'react';
import { Accordion, Icon} from 'semantic-ui-react'
import './MainLayout.css';


class ArticleItemsList extends Component{
  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(articleId, category){
    this.props.onArticleClick(articleId, category);
  }

  render(){
    return(
      <div className="ui middle aligned animated list divided items">
        <div></div>
        {this.props.articles.map((article)=>
          <ArticleItem key={article._id} category={this.props.category} clickedArticleId={this.props.clickedArticleId} articleInfo={article} onArticleClick={this.handleClick} />)}
        <div></div>
        </div>
    );
  }
}
var clickedStyle={
  boxShadow: '2px 2px 4px 1px  rgba(110,108,110,1)',
  backgroundColor:'rgba(60, 63, 66, 1)',
  color:'white',
  fontSize: '1.4em',
  width: '110%',
  marginLeft: '-5%',
  paddingLeft: '1em',
}


class ArticleItem extends Component{
  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(){
    this.props.onArticleClick(this.props.articleInfo._id, this.props.category);
  }

  render(){
    var tmp = this.props.clickedArticleId === this.props.articleInfo._id ? clickedStyle : {};
    return(
      <div style={tmp} className="item" onClick={this.handleClick}>{this.props.articleInfo.title}</div>
    );
  }
}

class PostSavedList extends Component{
  constructor(){
    super();
    this.handleArticleClick=this.handleArticleClick.bind(this);
  }

  handleArticleClick(articleId, category){
    this.props.onArticleClick(articleId, category);
  }

  render(){
    return(
      <Accordion>
        <Accordion.Title>
          <Icon name='dropdown' />
          Post Articles
        </Accordion.Title>
        <Accordion.Content>
          <ArticleItemsList category='post' clickedArticleId={this.props.clickedArticleId} onArticleClick={this.handleArticleClick} articles={this.props.postArticles} />
        </Accordion.Content>
        <Accordion.Title>
          <Icon name='dropdown' />
          Saved Articles
        </Accordion.Title>
        <Accordion.Content>
          <ArticleItemsList category='saved' clickedArticleId={this.props.clickedArticleId} onArticleClick={this.handleArticleClick} articles={this.props.savedArticles} />
        </Accordion.Content>
      </Accordion>
    );
  }
}

module.exports={
  PostSavedList,
  ArticleItemsList
}
