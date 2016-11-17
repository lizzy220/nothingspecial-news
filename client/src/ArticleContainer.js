import React, { Component } from 'react';
import {Popup, Icon, Modal, Button} from 'semantic-ui-react';
import request from 'superagent';
import jwtDecode from 'jwt-decode';

class ArticleContainer extends Component{
    constructor(props){
        super(props);
        this.deleteArticle=this.deleteArticle.bind(this);
        this.saveArticle=this.saveArticle.bind(this);
        this.newDescription=this.newDescription.bind(this);
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
                    console.log('save fail');
                } else {
                    self.props.onSaveArticle();
                    console.log('save successfully');
                }
            });
    }

    newDescription(description){
        this.props.newDescription(description);
    }

    imageItem() {
        if (this.props.clickedArticle.content.image) {
            return (
                <img className="ui fluid rounded image" src={this.props.clickedArticle.content.image.src} role="presentation"></img>
            )
        } else {
            return(<div></div>)
        }

    }

    render(){
        if(!Object.prototype.hasOwnProperty.call(this.props.clickedArticle, '_id')){
            return(
                <div>

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
                        <span style={{paddingLeft: '50%', paddingRight: '2%'}}>{formatted}</span>
                        <span>
              <SaveOrDeleteIcon newDescription={this.newDescription} clickedArticleId={this.props.clickedArticle._id} category={this.props.category} saved={this.props.saved} onSaveArticle={this.saveArticle} onDeleteArticle={this.deleteArticle}/>
            </span>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <span style={{color: '#DB2828'}}><i className="bookmark icon"></i>Brief Description: </span>
                        <span style={{fontStyle: 'italic'}}>{description}</span>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        {this.imageItem()}
                        <br />
                        {article_body}
                        </div>
                </div>
            );
        }
    }
}

class SaveOrDeleteIcon extends Component{
    constructor(props){
        super(props);
        this.state={ open: false };
        this.deleteArticle=this.deleteArticle.bind(this);
        this.saveArticle=this.saveArticle.bind(this);
        this.newDescription=this.newDescription.bind(this);
    }

    show = (dimmer) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    deleteArticle(){
        this.props.onDeleteArticle();
    }

    saveArticle(){
        this.props.onSaveArticle();
    }

    newDescription(){
        this.props.newDescription(this.refs.descriptionInput.value);
        var self = this;
        var data = {'description': self.refs.descriptionInput.value};
        request
            .post('/api/newDescription/' + self.props.clickedArticleId)
            .send(data)
            .set('Accept', 'application/json')
            .end(function(err, res){
                if (err || !res.ok) {
                    console.log('new description fail');
                } else {
                    console.log('new description successfully');
                }
            });
        this.close();
    }

    render(){
        if(this.context.location.pathname.indexOf('/userAccount') === -1){
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
            if(this.props.category === 'saved'){
                return(
                    <Popup
                        trigger={<Icon circular name='trash' color='green' onClick={this.deleteArticle}/>}
                        content='click to delete'
                        positioning='bottom center'
                        size='tiny'
                    />
                );
            }else{
                const { open, dimmer } = this.state;
                return(
                    <span>
                  <Popup
                      trigger={<Icon circular name='trash' color='green' onClick={this.deleteArticle}/>}
                      content='click to delete'
                      positioning='bottom center'
                      size='tiny'
                  />
                  <Popup
                      trigger={<Icon circular name='edit' color='green' onClick={this.show(true)}/>}
                      content='click to edit description'
                      positioning='bottom center'
                      size='tiny'
                  />
                  <Modal dimmer={dimmer} open={open} onClose={this.close}>
                      <Modal.Header>Edit the Description</Modal.Header>
                      <Modal.Content>
                          <div className="PostContentTable">
                              <form className="ui form">
                                  <div className="field">
                                      <label>New Description</label>
                                      <textarea rows="2" ref="descriptionInput"></textarea>
                                  </div>
                              </form>
                          </div>
                      </Modal.Content>
                      <Modal.Actions>
                          <Button inverted color="red" onClick={this.close}>Cancel</Button>
                          <Button inverted color="green" onClick={this.newDescription}>Save</Button>
                      </Modal.Actions>
                  </Modal>
                </span>
                );
            }
        }
    }
}

SaveOrDeleteIcon.contextTypes = {
    location: React.PropTypes.object
}

export default ArticleContainer;
