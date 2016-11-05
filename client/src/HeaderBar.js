import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'

class HeaderBar extends Component{
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    this.props.onSearchInput(this.refs.filterTextInput.value);
  }

  render(){
    return(
      <div className="HeaderBar">
        <input
          type="text"
          placeholder="Search..."
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <AddPostModal />
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
      <div className="AddPostModal">
        <Button onClick={this.show(true)}>Add Post</Button>
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
