import React, { Component } from 'react';
import ArticleItemsList, {PostSavedList} from './ArticleList'

import { Grid, Image, Segment, Divider } from 'semantic-ui-react'
// var maxHeightStyle = {
//     height: `100%`,
// }
class BodyContainer extends Component{
    constructor(){
        super();
        this.state={clickedArticleId: ''};
        this.handleArticleClick=this.handleArticleClick.bind(this);
    }

    handleArticleClick(articleId){
        this.setState({clickedArticleId: articleId});
    }

    render(){

        var postArticles=[{'id': '1', 'title': 'java'}];
        var savedArticles=[{'id': '2', 'title': 'C++'}];

        return(
            <Segment attached className='BodyContainer'>
                <Grid divided>
                    <Grid.Column width={3} >
                        <PostSavedList postArticles={postArticles} savedArticles={savedArticles} onArticleClick={this.handleArticleClick} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment basic>
                            article column
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3}>

                        comments column

                    </Grid.Column>
                </Grid>
            </Segment>
            /*<ArticleItemsList articles={this.props.articles} onArticleClick={this.handleArticleClick} />*/
            // <div className="ui gird">
            //     <div className="left floated right aligned three wide column">
            //         <div class="ui segment">
            //             <PostSavedList postArticles={postArticles} savedArticles={savedArticles} onArticleClick={this.handleArticleClick} />
            //         </div>
            //     </div>
            //     <div className="center aligned ten wide column">
            //         <div class="ui segment">
            //             <p>asdasds</p>
            //         </div>
            //     </div>
            //     <div className="right floated right aligned three wide column">
            //         <div class="ui segment">
            //             asdsd
            //         </div>
            //     </div>
            // </div>

        );
    }
}

export default BodyContainer;
