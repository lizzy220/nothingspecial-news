import React, { Component } from 'react';
import {PostSavedList, ArticleItemsList} from './ArticleList'
import { Grid, Image, Segment, Divider } from 'semantic-ui-react'

class HomeBodyContainer extends Component{
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
            <Segment attached className='BodyContainer'>
                <Grid divided>
                    <Grid.Column width={3} >
                        <PostSavedList postArticles={postArticles} savedArticles={savedArticles} onArticleClick={this.handleArticleClick} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment basic>
                            article column
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

class UserAccountBodyContainer extends Component{
  constructor(){
    super();
  }
}

module.exports={
  HomeBodyContainer,
  UserAccountBodyContainer
}
