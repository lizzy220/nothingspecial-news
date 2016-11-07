import React, { Component } from 'react';
import {Comment, Form, Header, Button} from 'semantic-ui-react';
import { render } from 'react-dom';

class CommentContainer extends Component {
    constructor(){
        super();
    }

    render() {
        const comments = [{'author': 'Yangyang', 'text': 'Great post!', 'timestamp': '1 days ago'}, {'author': 'Xi', 'text': 'La La La!', 'timestamp': '1 days ago'}]
        const commentListItem = comments.map(comment =>
            <Comment>
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
                {commentListItem}
                <div style={{position: 'absolute', width: '100%',padding: '1em', bottom: '1em', right: '0', left: '0', }}>
                    <Form size="small" onSubmit={e => e.preventDefault()}>
                        <Form.TextArea rows="3"/>
                        <Button basic fluid size="tiny" color="black" content='Add Comment' labelPosition='left' icon='comments'  />
                    </Form>
                 </div>
            </Comment.Group>
        );
    }
}

export default CommentContainer;