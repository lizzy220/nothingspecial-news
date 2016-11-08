import React, { Component } from 'react';
import './MainLayout.css';
import HeaderBar from './HeaderBar';
import request from 'superagent';
import jwtDecode from 'jwt-decode';

class MainLayout extends Component {
    constructor(){
        super();
        this.state = {articles: [],
            postArticles: [],
            savedArticles: [],
            clickedArticleId: '',
            clickedArticle: {}
        };
        this.handleArticlesLoad = this.handleArticlesLoad.bind(this);
        this.handlePostSavedArticlesLoad = this.handlePostSavedArticlesLoad.bind(this);
        this.handleNewPost = this.handleNewPost.bind(this);
        this.handleArticleClick=this.handleArticleClick.bind(this);
        this.deleteArticle=this.deleteArticle.bind(this);
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

    handleArticleClick(articleId){
        if(articleId !== ''){
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
                            clickedArticleId: articleId});
                    }
                });
        }else{
            this.setState({clickedArticleId: articleId});
        }
    }

    deleteArticle(){
        var self = this;
        var postArticles = self.state.postArticles.filter(function(article){ return article._id !== self.state.clickedArticleId; });
        if(postArticles.length < self.state.postArticles.length){
            var articles = self.state.articles.filter(function(article){ return article._id !== self.state.clickedArticleId; });
            self.setState({
                articles: articles,
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
                        onArticlesLoad: this.handleArticlesLoad,
                        onPostSavedArticlesLoad: this.handlePostSavedArticlesLoad,
                        onArticleClick: this.handleArticleClick,
                        onDeleteArticle: this.deleteArticle,
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
