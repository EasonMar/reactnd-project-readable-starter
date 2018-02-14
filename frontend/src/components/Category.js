import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';

class Category extends Component {
	componentWillMount(){
		this.props.initCategory()
	}
	render() {
		return(
			<ul className="Category">
				{

				}
			</ul>
		)
	}
}

function mapStateToProps ({ categories }) {
	return{categories}
}

function mapDispatchToProps (dispatch) {
	return {
		initCategory: () => dispatch(fetchCategories())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Category)