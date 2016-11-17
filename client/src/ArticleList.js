import React, { Component } from 'react';
import { Accordion, Icon} from 'semantic-ui-react'
import './MainLayout.css';
import { browserHistory } from 'react-router'


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
    userSelect: 'none',
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
        var tmp = this.props.clickedArticleId === this.props.articleInfo._id ? clickedStyle : {userSelect: 'none'};
        return(
            <div style={tmp} className="item" onClick={this.handleClick}>{this.props.articleInfo.title}</div>
        );
    }
}

class PostSavedList extends Component{

    constructor(props){
        super(props);
        this.handleArticleClick=this.handleArticleClick.bind(this);
        this.handleTitleClick=this.handleTitleClick.bind(this);
        this.state = { activeIndex: -1 };

    }

    componentDidMount() {
        var self = this;
        if (self.props.activeCollection === "post") {
            this.setState({activeIndex: 0})
        } else if (self.props.activeCollection === "saved") {
            this.setState({activeIndex: 2})
        }
    }
    handleArticleClick(articleId, category){
        this.props.onArticleClick(articleId, category);
    }

    handleTitleClick(e, i) {
        if (i === this.state.activeIndex) {
            this.setState({activeIndex: -1})
            browserHistory.push('/userAccount');
        } else if (i === 0) {
            this.setState({activeIndex: 0})
            browserHistory.push('/userAccount/post');
        } else if (i === 2) {
            this.setState({activeIndex: 2})
            browserHistory.push('/userAccount/saved');
        } else {
            this.setState({activeIndex: -1})
            browserHistory.push('/userAccount');

        }
    }

    render(){
        const activeIndex = this.state.activeIndex;

        return(
            <Accordion activeIndex={activeIndex} onTitleClick={this.handleTitleClick}>
                <Accordion.Title>
                    <Icon name='dropdown' />
                    <b>Post Articles</b>
                </Accordion.Title>
                <Accordion.Content>
                    <ArticleItemsList category='post' clickedArticleId={this.props.clickedArticleId} onArticleClick={this.handleArticleClick} articles={this.props.postArticles} />
                </Accordion.Content>
                <Accordion.Title>
                    <Icon name='dropdown' />
                    <b>Saved Articles</b>
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
