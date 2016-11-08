import React, { Component } from 'react';
import {PostSavedList, ArticleItemsList} from './ArticleList';
import CommentContainer from './CommentContainer'
import { Grid, Segment } from 'semantic-ui-react';
import request from 'superagent';
import ArticleContainer from './ArticleContainer';

class HomeBodyContainer extends Component{
  constructor(){
    super();
    this.handleArticleClick=this.handleArticleClick.bind(this);
    this.handleArticlesLoad=this.handleArticlesLoad.bind(this);

  }

  componentDidMount() {
    var self = this;
    request
     .get('/api/articles/search')
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('fail to load initial list', err);
       } else {
         self.handleArticlesLoad(res.body);
       }
     });
  }

  componentWillUnmount(){
    this.handleArticleClick('');
  }

  handleArticlesLoad(articles){
    this.props.onArticlesLoad(articles);
  }

    handleArticleClick(articleId){
        this.props.onArticleClick(articleId);
    }

    render(){
        return(
            <Segment attached className='BodyContainer'>
                <Grid divided>
                    <Grid.Column width={4}>
                        <ArticleItemsList clickedArticleId={this.props.clickedArticleId} articles={this.props.articles} onArticleClick={this.handleArticleClick} />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Segment basic>
                            <ArticleContainer clickedArticleId={this.props.clickedArticleId} clickedArticle={this.props.clickedArticle} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <CommentContainer/>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}

class UserAccountBodyContainer extends Component{
  constructor(){
    super();
    this.handleArticleClick=this.handleArticleClick.bind(this);
    this.handlePostSavedArticlesLoad=this.handlePostSavedArticlesLoad.bind(this);
    this.deleteArticle=this.deleteArticle.bind(this);
  }

  componentDidMount() {
    var self = this;
    request
     .get('/api/articles/search')
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('fail to load initial list', err);
       } else {
         self.handlePostSavedArticlesLoad(res.body);
       }
     });
  }

  componentWillUnmount(){
    this.handleArticleClick('');
  }

  handlePostSavedArticlesLoad(articles){
    this.props.onPostSavedArticlesLoad(articles);
  }
  handleArticleClick(articleId){
      console.log(articleId);
      this.props.onArticleClick(articleId);
  }
  deleteArticle(){
    this.props.onDeleteArticle();
  }

  render(){
    return(
        <Segment attached className='BodyContainer'>
            <Grid divided>
                <Grid.Column width={4} >
                    <PostSavedList postArticles={this.props.postArticles} savedArticles={this.props.savedArticles} clickedArticleId={this.props.clickedArticleId} onArticleClick={this.handleArticleClick}/>
                </Grid.Column>
                <Grid.Column width={9}>
                    <Segment basic>
                        <ArticleContainer onDeleteArticle={this.deleteArticle} clickedArticleId={this.props.clickedArticleId} clickedArticle={this.props.clickedArticle} />
                    </Segment>
                </Grid.Column>
                <Grid.Column width={3}>
                    <CommentContainer/>
                </Grid.Column>
            </Grid>
        </Segment>
    );
  }

}

module.exports={
  HomeBodyContainer,
  UserAccountBodyContainer
}
