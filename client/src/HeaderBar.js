import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'

class HeaderBar extends Component{
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){
        var articles=[{'id': '1', 'title': 'java'}, {'id': '2', 'title': 'C++'}];
        //To Do: get data from database and update articles array
        this.props.onSearchInput(articles);
    }

    render(){
        return(
            <div className="ui  grid top attached secondary inverted teal menu HeaderBar">
                <a className="item">
                    <i className="home icon"></i> Home
                </a>
                <a className="item">
                    <i className="edit icon"></i>My Posts
                </a>
                <AddPostModal />
                <div className="right menu">
                    <div className="ui stackable two column grid">
                        <div className="item">
                            <div className="ui icon input item">
                                <input type="text" placeholder="Search..." ref="filterTextInput" onChange={this.handleChange} />
                                <i class="search link icon"></i>
                            </div>
                        </div>
                        <div className="item">
                            <a>Logout</a>
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
        var data = {
            "title" : this.refs.titleInput.value,
            "link": this.refs.linkInput.value,
            "description": this.refs.descriptionInput.value,
        };
        //send to database
        this.close();

    }

    render(){
        const { open, dimmer } = this.state
        return(
            <div className="AddPostModal ui grid">
                <a className='item' onClick={this.show(true)}><i className="add circle icon"></i>Add Post</a>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Add a Post</Modal.Header>
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
