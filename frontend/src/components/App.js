import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import List from './List.js';
import Detail from './Detail.js';
import Create from './Create.js';
import Edit from './Edit.js';
import { fetchPosts,fetchCategories } from '../actions';

class App extends Component {
	componentWillMount(){
		this.props.dispatch(fetchPosts());
		this.props.dispatch(fetchCategories());
	}
  	render() {
		return (
			<div className="app">
				<Route path="/" exact component={List} />
				<Route path="/list/:cat" component={List} />
				<Route path="/detail/:pid" component={Detail} />
				<Route path="/create/:pid" component={Create} />
				<Route path="/edit/:pid" component={Edit} />
			</div>
		);
  	}
}
export default withRouter(connect()(App))