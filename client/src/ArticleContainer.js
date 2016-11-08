import React, { Component } from 'react';
import {Popup, Icon} from 'semantic-ui-react';
import request from 'superagent';
import jwtDecode from 'jwt-decode';

class ArticleContainer extends Component{
  constructor(){
    super();
    this.deleteArticle=this.deleteArticle.bind(this);
    this.saveArticle=this.saveArticle.bind(this);
  }

  deleteArticle(){
    this.props.onDeleteArticle();
    var self = this;
    const data = {'username': jwtDecode(localStorage.jwtToken).username,
                'article': {"_id": self.props.clickedArticle._id, "title": self.props.clickedArticle.title}};
    request
      .post('/api/articles/delete')
      .send(data)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err || !res.ok) {
          alert('delete fail');
        } else {
          console.log('delete successfully');
        }
    });
  }

  saveArticle(){
    var self = this;
    const data = {'username': jwtDecode(localStorage.jwtToken).username,
                'article': {"_id": self.props.clickedArticle._id, "title": self.props.clickedArticle.title}};
    request
      .post('/api/articles/save')
      .send(data)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err || !res.ok) {
          alert('save fail');
        } else {
          console.log('save successfully');
        }
    });
  }

  render(){
    if(!Object.prototype.hasOwnProperty.call(this.props.clickedArticle, '_id') || this.props.clickedArticleId === ''){
      return(
        <div>
          <h1>Nothing Special</h1>
          <div>Knowledge Has Never Been So Sexy!</div>
        </div>
      );
    }else{
      var date = new Date(this.props.clickedArticle.timestamp);
      var formatted = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      var description = this.props.clickedArticle.description === '' ? '' : this.props.clickedArticle.description;
      var article_body = this.props.clickedArticle.content.body.split('\n').map((paragraph, i) =>
        <p key={i}>{paragraph}</p>
      );
      return(
        <div>
          <h1>{this.props.clickedArticle.content.title}</h1>
          <div>
            <span><a href={this.props.clickedArticle.url}>See Original Page</a></span>
            <span style={{paddingLeft: '57%', paddingRight: '2%'}}>{formatted}</span>
            <span>
              <SaveOrDeleteIcon saved={this.props.clickedArticle.saved} onSaveArticle={this.saveArticle} onDeleteArticle={this.deleteArticle}/>
            </span>
          </div>
          <div style={{marginTop: '20px'}}>
            <span style={{color: '#DB2828'}}><i className="bookmark icon"></i>Brief Description: </span>
            <span style={{fontStyle: 'italic'}}>{description}</span>
          </div>
          <div style={{marginTop: '20px'}}>{article_body}</div>
        </div>
      );
    }
  }
}

class SaveOrDeleteIcon extends Component{
  constructor(){
    super();
    this.deleteArticle=this.deleteArticle.bind(this);
    this.saveArticle=this.saveArticle.bind(this);
    // this.state = {this.props.}
  }

  deleteArticle(){
    this.props.onDeleteArticle();
  }

  saveArticle(){
    this.props.onSaveArticle();
  }

  render(){
    if(this.context.location.pathname === '/home'){
      var color = 'olive'
      var tooltip = "click to save"
      if (this.props.saved) {
        color = 'red'
        tooltip = "saved"
      }

      return(
        <Popup
          trigger={<Icon circular name='heart' color={color} onClick={this.saveArticle}/>}
          content={tooltip}
          positioning='bottom center'
          size='tiny'
        />
      );
    }else{
      return(
        <Popup
          trigger={<Icon circular name='trash' color='green' onClick={this.deleteArticle}/>}
          content='click to delete'
          positioning='bottom center'
          size='tiny'
        />
      );
    }
  }
}

SaveOrDeleteIcon.contextTypes = {
    location: React.PropTypes.object
 }

export default ArticleContainer;
