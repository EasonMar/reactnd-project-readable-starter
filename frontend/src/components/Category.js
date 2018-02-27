import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions';

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
						<li key={cate.name}
							style={{
								cursor: 'pointer',
								float: 'left',
								marginLeft: '10px',
								listStyle: 'none'
							}}
						>
							<Link to={`/${cate.path === 'default' ? '' : cate.path}`}>
								{cate.name === this.props.cateSelect
									? <span style={{color: 'red'}}>{cate.name}</span>
									: <span>{cate.name}</span>
								}
							</Link>
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
		initCategory: () => dispatch(fetchCategories())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Category)