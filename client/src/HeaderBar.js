import React, { Component } from 'react';
import { Button, Modal} from 'semantic-ui-react'
import request from 'superagent';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';

var amazingInlineJsStyle = {
    fontFamily: 'fantasy',
    fontSize: '1.5em',
}

var meue_item_style = {
    fontSize: '1.2em'
}

class HeaderBar extends Component{
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
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

    handleNewPost(newArticle){
      this.props.onNewPost(newArticle);
    }

    logout(){
      localStorage.removeItem('jwtToken');
    }

    homeItem() {
        var location = window.location.href;
        if (location.indexOf("/home") > 0 || location.indexOf("/article") > 0) {
            return (
                <div className="active item" style={meue_item_style}><i className="home icon"></i>Home</div>
            )
        } else {
            return (
                <Link as='a' className='item' to='/home' style={meue_item_style}><i className="home icon"></i>Home</Link>
            )
        }
    }

    userAccountItem() {
        var location = window.location.href;
        if (location.indexOf("/userAccount") > 0) {
            return (
                <div className="active item" style={meue_item_style}><i className="user icon"></i>My Account</div>
            )
        } else {
            return (
                <Link as='a' className='item' to='/userAccount' style={meue_item_style}><i className="user icon"></i>My Account</Link>
            )
        }
    }

    searchboxItem(){
        var location = window.location.href;
        if (location.indexOf("/home") > 0 || location.indexOf("/article") > 0) {
            return (
                <div className="ui icon input">
                    <input type="text" placeholder="Search..." ref="filterTextInput" onChange={this.handleChange} />
                    <i className="search link icon"></i>
                </div>
            )
        } else {
            return (
                <div className="item"></div>
            )
        }
    }


    render(){
        return(
            <div className="ui top attached inverted segment" style={{padding: '0'}}>
            <div className="ui grid secondary inverted menu HeaderBar" style={{padding: '0'}}>
                <span className="item" style={amazingInlineJsStyle}>
                    Nothing Special
                </span>

                {this.homeItem()}
                <AddPostModal onNewPost={this.handleNewPost}/>
                <div className="right item">
                    {this.searchboxItem()}
                </div>
                {this.userAccountItem()}
                <Link to="/" as='a' className="item"><i className="sign out icon large" onClick={this.logout}></i></Link>

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
            "username": jwtDecode(localStorage.jwtToken).username,
            "article": {
              "title" : this.refs.titleInput.value,
              "url": this.refs.linkInput.value,
              "description": this.refs.descriptionInput.value,
            }
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
            <div className="AddPostModal ui grid item " style={{padding: '0'}}>
                <a className='item' onClick={this.show(true)}  style={meue_item_style}><i className="add circle icon"></i>Share New Article</a>
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
                        <Button inverted color="red" onClick={this.close}>Cancel</Button>
                        <Button inverted color="green" onClick={this.publishPost}>Publish</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default HeaderBar;
