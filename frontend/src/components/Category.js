import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions';

class Category extends Component {
	componentWillMount(){
		this.props.initCategory()
	}

	render() {
		const { categories, cateSelect } = this.props;
		return(
			<ul className="Category">
				{
					categories.map(cate=>(
						<li key={cate.name}>
							<Link to={`/${cate.path === 'default' ? '' : cate.path}`}>
								{cate.name === cateSelect
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