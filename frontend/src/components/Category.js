import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchCategorizedPosts } from '../actions';

class Category extends Component {
	componentWillMount(){
		this.props.initCategory()
	}

	render() {
		return(
			<ul className="Category"
				style={{
					overflow: 'hidden',
					margin: '10px'
				}}
			>
				{
					this.props.categories.map(cate=>(
						<li key={cate.path}
							style={{
								cursor: 'pointer',
								float: 'left',
								marginLeft: '10px',
								listStyle: 'none'
							}}
							onClick={() => this.props.categorizedPosts(cate.path)}
						>
							{cate.name === this.props.cateSelect
								? <span style={{color: 'red'}}>{cate.name}</span>
								: <span>{cate.name}</span>
							}
						</li>
					))
				}
			</ul>
		)
	}
}

function mapStateToProps ({ categories, cateSelect }) {
	return {
		categories,
		cateSelect
	}
}

function mapDispatchToProps (dispatch) {
	return {
		initCategory: () => dispatch(fetchCategories()),
		categorizedPosts: category => dispatch(fetchCategorizedPosts(category))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Category)