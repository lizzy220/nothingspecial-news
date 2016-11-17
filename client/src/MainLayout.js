import React, { Component } from 'react';
import './MainLayout.css';
import HeaderBar from './HeaderBar';
import request from 'superagent';
import jwtDecode from 'jwt-decode';
import update from 'react-addons-update';
import { browserHistory } from 'react-router'

class MainLayout extends Component {
    constructor(){
        super();
        this.state = {articles: [],
            postArticles: [],
            savedArticles: [],
            clickedArticleId: '',
            clickedArticle: {},
            comments: [],
            saved: false,
            refresh: this
        };
        this.handleArticlesLoad = this.handleArticlesLoad.bind(this);
        this.handlePostSavedArticlesLoad = this.handlePostSavedArticlesLoad.bind(this);
        this.handleNewPost = this.handleNewPost.bind(this);
        this.handleArticleClick=this.handleArticleClick.bind(this);
        this.deleteArticle=this.deleteArticle.bind(this);
        this.handleNewComment=this.handleNewComment.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        this.newDescription=this.newDescription.bind(this);
    }

    handleNewPost(newArticle){
        this.setState({articles: [newArticle].concat(this.state.articles),
            postArticles: [newArticle].concat(this.state.postArticles)});
        this.handleArticleClick(newArticle._id);
    }

    handleArticlesLoad(articles){
        this.setState({articles: articles});
    }

    handlePostSavedArticlesLoad(articles){
        this.setState({postArticles: articles.posts,
            savedArticles: articles.saved});
    }

    handleNewComment(newComment){
      this.setState({comments: this.state.comments.concat(newComment)});
    }

    handleArticleClick(articleId, category){
        if(articleId !== ''){
            if (category ) {
                browserHistory.push('/userAccount/' + category + "/" + articleId);
            } else {
                browserHistory.push('/article/'+articleId);
            }
            this.setState({clickedArticleId: articleId,
                comments: [],
                saved: false,
                clickedArticle: {}});
            var self = this;
            const data = {'username': jwtDecode(localStorage.jwtToken).username}
            request
                .post('/api/articles/article/' + articleId)
                .send(data)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err || !res.ok) {
                        console.log('fail to load article', err);
                    } else {
                        self.setState({clickedArticle: res.body,
                            clickedArticleId: articleId,
                            comments: res.body.comments,
                            saved: res.body.saved
                        });
                    }
                });
        }else{
            this.setState({clickedArticleId: articleId,
                          comments: [],
                            saved: false,
                        clickedArticle: {}});
        }
    }

    saveArticle() {
        this.setState({saved: true});
    }

    deleteArticle(){
        var self = this;
        var postArticles = self.state.postArticles.filter(function(article){ return article._id !== self.state.clickedArticleId; });
        if(postArticles.length < self.state.postArticles.length){
            self.setState({
                postArticles: postArticles,
                clickedArticleId: '',
                clickedArticle: {}
            });
        }else{
            var savedArticles = self.state.savedArticles.filter(function(article){ return article._id !== self.state.clickedArticleId; });
            self.setState({
                savedArticles: savedArticles,
                clickedArticleId: '',
                clickedArticle: {}
            });
        }
    }

    newDescription(description){
      const newClickedArticle = update(this.state.clickedArticle, {'description': {$set: description}});
      this.setState({clickedArticle: newClickedArticle});
    }


    getChildContext() {
        return {
            location: this.props.location
        }
    }

    render() {
        return (
            <div className="MainLayout" style={{flex:'1'}}>
                <HeaderBar onSearchInput={this.handleArticlesLoad} onNewPost={this.handleNewPost}/>
                <main>
                    {this.props.children && React.cloneElement(this.props.children, {
                        articles: this.state.articles,
                        postArticles: this.state.postArticles,
                        savedArticles: this.state.savedArticles,
                        clickedArticleId: this.state.clickedArticleId,
                        clickedArticle: this.state.clickedArticle,
                        comments: this.state.comments,
                        saved: this.state.saved,
                        onArticlesLoad: this.handleArticlesLoad,
                        onPostSavedArticlesLoad: this.handlePostSavedArticlesLoad,
                        onArticleClick: this.handleArticleClick,
                        onDeleteArticle: this.deleteArticle,
                        onNewComment: this.handleNewComment,
                        onSaveArticle: this.saveArticle,
                        newDescription: this.newDescription
                    })}
                </main>
            </div>
        );
    }
}

MainLayout.childContextTypes = {
    location: React.PropTypes.object
}

export default MainLayout;
