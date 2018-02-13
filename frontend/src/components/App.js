import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PostList from './PostList.js';
import PostDetail from './PostDetail.js';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class App extends Component {
	componentWillMount(){
		this.props.dispatch(fetchPosts());
	}
  	render() {
		return (
			<div className="app">
				<Route path="/" exact render={() => <PostList/>} />
				<Route path="/detail" render={() => <PostDetail/>} />
			</div>
		);
  	}
}

export default connect()(App)