import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PostList from './PostList.js';
import PostDetail from './PostDetail.js';

class App extends Component {
  	render() {
		return (
			<div className="app">
				<Route path="/" exact render={() => <PostList/>} />
				<Route path="/detail" render={() => <PostDetail/>} />
			</div>
		);
  	}
}

export default App