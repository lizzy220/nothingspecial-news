import React, { Component } from 'react';
import {PostSavedList, ArticleItemsList} from './ArticleList';
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
                    <Grid.Column width={3} >
                        <ArticleItemsList articles={this.props.articles} onArticleClick={this.handleArticleClick} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment basic>
                            <ArticleContainer clickedArticleId={this.props.clickedArticleId} clickedArticle={this.props.clickedArticle} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3}>

                        comments column

                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}

// class UserAccountBodyContainer extends Component{
//   constructor(){
//     super();
//
//   }
//
//   componentDidMount() {
//     var self = this;
//     request
//      .get('/api/articles/list')
//      .set('Accept', 'application/json')
//      .end(function(err, res) {
//        if (err || !res.ok) {
//          console.log('fail to load initial list', err);
//        } else {
//          self.handleArticlesLoad(res.body);
//        }
//      });
//   }
//
// }

module.exports={
  HomeBodyContainer,
}
