import React, { Component } from 'react';
import {Comment, Header, Button} from 'semantic-ui-react';
import request from 'superagent';
import jwtDecode from 'jwt-decode';

class CommentContainer extends Component {
    constructor(){
        super();
        this.handleNewComment=this.handleNewComment.bind(this);
    }

    handleNewComment(){
      console.log('comment');
      var date = new Date(Date.now());
      var formatted = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const data = {'author': jwtDecode(localStorage.jwtToken).username,
                    'text': this.refs.commentInput.value,
                    'timestamp':formatted};
      this.props.onNewComment(data);
      this.refs.commentInput.value = '';
      request
        .post('/api/comments/new/' + this.props.clickedArticleId)
        .send(data)
        .set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res.ok) {
            alert('comment fail');
          } else {

            console.log('comment successfully');
          }
      });
    }

    render() {
        const commentListItem = this.props.comments.map((comment, i) =>
            <Comment key={i} >
                <Comment.Content>
                    <Comment.Author as='a'>{comment.author}</Comment.Author>
                    <Comment.Metadata>
                        <div>{comment.timestamp}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                </Comment.Content>
            </Comment>
        );

        return (
            <Comment.Group>
                <Header as='h3' dividing>Comments</Header>
                <div>
                   <div className="ui segment" style={{height: '60vh', overflow: 'auto'}}>{commentListItem}</div>
                   <div className="ui form" size="small">
                       <textarea style={{marginBottom: "10px"}} type='text' ref="commentInput" rows="3"/>
                       <Button fluid size="tiny"  content='Add Comment' labelPosition='left' icon='comments'  onClick={this.handleNewComment} />
                   </div>
                 </div>
            </Comment.Group>
        );
    }
}

export default CommentContainer;
