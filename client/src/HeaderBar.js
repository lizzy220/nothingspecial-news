import React, { Component } from 'react';
import { Button, Modal} from 'semantic-ui-react'
import request from 'superagent';

var amazingInlineJsStyle = {
    fontFamily: 'fantasy',
    fontSize: '1.5em',
}

class HeaderBar extends Component{
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleUserAccount=this.handleUserAccount.bind(this);
        this.handleNewPost=this.handleNewPost.bind(this);
    }

    handleChange(){
        var self = this;
        request
         .get('/api/articles/search/' + self.refs.filterTextInput.value)
         .set('Accept', 'application/json')
         .end(function(err, res) {
           if (err || !res.ok) {
             console.log('fail to load initial list', err);
           } else {
             self.props.onSearchInput(res.body);
           }
         });
    }

    handleUserAccount(){
      //To Do: get postArticles and savedArticles from database
      var postArticles=[{'id': '1', 'title': 'java'}];
      var savedArticles=[{'id': '2', 'title': 'C++'}];
      this.props.onClickUser(postArticles, savedArticles);
    }

    handleNewPost(newArticle){
      this.props.onNewPost(newArticle);
    }

    render(){
        return(
            <div className="ui grid top attached secondary inverted teal menu HeaderBar">
                <a className="item" style={amazingInlineJsStyle}>
                    {/*<i className="home icon"></i> */}
                    Nothing Special
                </a>
                <a className="item">
                    <i className="edit icon"></i>My Posts
                </a>
                <AddPostModal onNewPost={this.handleNewPost}/>
                <div className="right menu">
                    <div className="ui grid">
                        <div className="item">
                            <div className="ui icon input item">
                                <input type="text" placeholder="Search..." ref="filterTextInput" onChange={this.handleChange} />
                                <i className="search link icon"></i>
                            </div>
                        </div>
                        <div className="item">
                            <i className='user icon' onClick={this.handleUserAccount}></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class AddPostModal extends Component{
    constructor(){
        super();
        this.state={ open: false };
        this.publishPost = this.publishPost.bind(this);
    }

    show = (dimmer) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    publishPost(){
        var self = this;
        var data = {
            "title" : this.refs.titleInput.value,
            "url": this.refs.linkInput.value,
            "description": this.refs.descriptionInput.value,
        };

        request
          .post('/api/articles/new')
          .send(data)
          .set('Accept', 'application/json')
          .end(function(err, res){
            if (err || !res.ok) {
              alert('publish fail');
            } else {
              var newArticle = res.body;
              self.props.onNewPost(newArticle);
            }
        });
        this.close();
    }

    render(){
        const { open, dimmer } = this.state
        return(
            <div className="AddPostModal ui grid">
                <a className='item' onClick={this.show(true)} ><i className="add circle icon"></i>Share New Article</a>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Share New Article</Modal.Header>
                    <Modal.Content>
                        <div className="PostContentTable">
                            <form className="ui form">
                                <div className="field">
                                    <label>Title</label>
                                    <input type="text" ref="titleInput" />
                                </div>
                                <div className="field">
                                    <label>Original Link</label>
                                    <input type="text" ref="linkInput" />
                                </div>
                                <div className="field">
                                    <label>Description</label>
                                    <textarea rows="2" ref="descriptionInput"></textarea>
                                </div>
                            </form>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close}>Cancel</Button>
                        <Button onClick={this.publishPost}>Publish</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default HeaderBar;
