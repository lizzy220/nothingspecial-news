import React, { Component } from 'react';

class ArticleContainer extends Component{
  constructor(){
    super();
  }

  render(){
    if(this.props.clickedArticleId === ''){
      return(
        <div>
          <h1>Nothing Special</h1>
          <div>Knowledge Has Never Been So Sexy!</div>
        </div>
      );
    }else{
      return(
        <div>
          <h1>{this.props.clickedArticle.title}</h1>
          <div>{this.props.clickedArticle.body}</div>
        </div>
      );
    }
  }
}

export default ArticleContainer;
