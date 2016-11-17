import React, { Component } from 'react';
import {PostSavedList, ArticleItemsList} from './ArticleList';
import CommentContainer from './CommentContainer'
import { Grid, Segment,Popup, Icon} from 'semantic-ui-react';
import request from 'superagent';
import ArticleContainer from './ArticleContainer';
import jwtDecode from 'jwt-decode';
import ReactPullToRefresh from "react-pull-to-refresh";

class HomeBodyContainer extends Component {
    constructor(props) {
        super(props);
        this.handleArticleClick = this.handleArticleClick.bind(this);
        this.handleArticlesLoad = this.handleArticlesLoad.bind(this);
        this.handleNewComment = this.handleNewComment.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.state = {refresh: false}
    }

    componentDidMount() {
        var self = this;
        request
            .get('/api/articles/search')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('fail to load initial list', err);
                } else {
                    if (self.props.params.articleId) {
                        self.handleArticleClick(self.props.params.articleId);
                    }
                    self.handleArticlesLoad(res.body);
                }

            });
    }

    handleRefresh(resolve, reject) {
        var self = this;
        self.setState({refresh: true});
        request
            .get('/api/articles/search')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('fail to load initial list', err);
                    reject();
                } else {
                    self.setState({refresh: false});
                    if (self.props.params.articleId) {
                        self.handleArticleClick(self.props.params.articleId);
                    }
                    self.handleArticlesLoad(res.body);
                    resolve();
                }

            });
    }

    componentWillUnmount() {
        this.handleArticleClick('');
    }

    handleArticlesLoad(articles) {
        this.props.onArticlesLoad(articles);
    }

    handleArticleClick(articleId, category) {
        this.props.onArticleClick(articleId);
    }

    handleNewComment(newComment) {
        this.props.onNewComment(newComment);
    }

    saveArticle() {
        this.props.onSaveArticle();
    }

    refreshStatus() {
        if (this.state.refresh === true) {
            return (
                <div style={{textAlign: "right"}}><i className="circular large olive spinner loading icon"></i></div>
            )
        } else {
            return (
                <div style={{textAlign: "right", height: '2em', marginTop: '-0.5em', backgroundSize: 'auto 100%'}}><Popup
                    trigger={<Icon circular name='refresh' color='olive' size="large"/>}
                    content='Drag down to refresh'
                    positioning='left center'
                    size='mini'
                />
                </div>
            )
        }
    }

    render() {

        if (this.props.clickedArticleId) {
            return (
                <Segment attached className='BodyContainer'>
                    <Grid divided>
                        <Grid.Column width={4} style={{height: '100vh', overflowY: 'auto', overflowX: 'hidden'}}>
                            <ReactPullToRefresh onRefresh={this.handleRefresh} distanceToRefresh={20} resistance={1}>
                                {this.refreshStatus()}
                                <ArticleItemsList category='' clickedArticleId={this.props.clickedArticleId}
                                                  articles={this.props.articles} onArticleClick={this.handleArticleClick}/>
                            </ReactPullToRefresh>
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <Segment basic>
                                <ArticleContainer saved={this.props.saved} onSaveArticle={this.saveArticle}
                                                  clickedArticleId={this.props.clickedArticleId}
                                                  clickedArticle={this.props.clickedArticle}/>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <CommentContainer clickedArticleId={this.props.clickedArticleId}
                                              onNewComment={this.handleNewComment} comments={this.props.comments}/>
                        </Grid.Column>
                    </Grid>
                </Segment>

            );
        } else {
            return (
                <Segment attached className='BodyContainer'>
                    <Grid divided>
                        <Grid.Column width={4} style={{height: '91vh', overflowY: 'auto', overflowX: 'hidden'}}>
                            <ReactPullToRefresh onRefresh={this.handleRefresh} distanceToRefresh={20} resistance={1}>
                                <div>{this.refreshStatus()}<ArticleItemsList category='' clickedArticleId={this.props.clickedArticleId}
                                                                             articles={this.props.articles} onArticleClick={this.handleArticleClick}/></div>
                            </ReactPullToRefresh>
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <Segment basic>
                                <ArticleContainer saved={this.props.saved} onSaveArticle={this.saveArticle}
                                                  clickedArticleId={this.props.clickedArticleId}
                                                  clickedArticle={this.props.clickedArticle}/>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={3}>

                        </Grid.Column>
                    </Grid>
                </Segment>

            );
        }
    }
}

class UserAccountBodyContainer extends Component{
    constructor(){
        super();
        this.state={category: ''};
        this.handleArticleClick=this.handleArticleClick.bind(this);
        this.handlePostSavedArticlesLoad=this.handlePostSavedArticlesLoad.bind(this);
        this.deleteArticle=this.deleteArticle.bind(this);
        this.handleNewComment=this.handleNewComment.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        this.newDescription=this.newDescription.bind(this);
    }

    componentDidMount() {
        var self = this;
        const data = {'username': jwtDecode(localStorage.jwtToken).username};
        request
            .post('/api/articles/usercollection')
            .send(data)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err || !res.ok) {
                    console.log('fail to load user collection', err);
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
    handleArticleClick(articleId, category){
        this.setState({category: category});

        this.props.onArticleClick(articleId, category);
    }
    deleteArticle(){
        this.props.onDeleteArticle();
    }

    handleNewComment(newComment){
        this.props.onNewComment(newComment);
    }

    saveArticle() {
        this.props.onSaveArticle()
    }

    newDescription(description){
        this.props.newDescription(description);
    }

    render(){
        return(
            <Segment attached className='BodyContainer'>
                <Grid divided>
                    <Grid.Column width={4} style={{height:'91vh', overflowY: 'auto', overflowX:'hidden'}}>
                        <PostSavedList activeCollection={this.props.params.activeCollection} postArticles={this.props.postArticles} savedArticles={this.props.savedArticles} clickedArticleId={this.props.clickedArticleId} onArticleClick={this.handleArticleClick}/>
                    </Grid.Column>
                    <Grid.Column width={9} >
                        <Segment basic>
                            <ArticleContainer newDescription={this.newDescription} category={this.state.category} saved={this.props.saved} onSaveArticle={this.saveArticle} onDeleteArticle={this.deleteArticle} clickedArticleId={this.props.clickedArticleId} clickedArticle={this.props.clickedArticle} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3} >
                        <CommentContainer clickedArticleId={this.props.clickedArticleId} onNewComment={this.handleNewComment} comments={this.props.comments}/>
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
