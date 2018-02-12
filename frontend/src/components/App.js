import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PostList from './PostList.js';
import PostDetail from './PostDetail.js';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import * as API from '../utils/api';

class App extends Component {
	componentWillMount(){

	}
  	render() {
		return (
			<div className="app">
				<Route path="/" exact render={() => <PostList />} />
				<Route path="/detail" render={() => <PostDetail />} />
			</div>
		);
  	}
}


function mapStateToProps ({ posts }) {
	return{
		posts: posts.map(post =>({
			id: post.id,
			title: post.title,
			body: post.body,
			author: post.author,
			category: post.category,
			voteScore: post.voteScore,
			commentCount: post.commentCount,
			timestamp: post.timestamp
		}))
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPost: (postId) => dispatch(fetchPosts(postId))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(App)