import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PostList from './PostList.js';
import PostDetail from './PostDetail.js';

class App extends Component {
  	render() {
		return (
			<div className="app">
				<Route path="/" exact render={() => <PostList path="default" />} />
				<Route path="/react" render={() => <PostList path="react" />} />
				<Route path="/redux" render={() => <PostList path="redux" />} />
				<Route path="/udacity" render={() => <PostList path="udacity" />} />
				<Route path="/detail" render={() => <PostDetail/>} />
			</div>
		);
  	}
}

export default App