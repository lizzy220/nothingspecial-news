import React, { Component } from 'react';
import './MainLayout.css';
import HeaderBar from './HeaderBar';

class MainLayout extends Component {
  constructor(){
    super();
    this.state = {filterText: '',
                  articles: [],
                  clickedArticleId: ''};
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount(){
    
  }

  handleSearchInput(filterText){
    this.setState({filterText: filterText});
  }

  render() {
    return (
      <div className="MainLayout">
        <div className="MainLayout__header">
          <HeaderBar onSearchInput={this.handleSearchInput} />
        </div>

        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default MainLayout;
