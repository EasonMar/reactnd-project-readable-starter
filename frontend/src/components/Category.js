import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Category extends Component {

	render() {
		const { categories, cate } = this.props;
		return(
			<ul className="Category">
				{
					categories.map(category=>(
						<li key={category.name}>
							<Link to={category.path}>
								{category.name === cate
									? <span style={{color: 'red'}}>{category.name}</span>
									: <span>{category.name}</span>
								}
							</Link>
						</li>
					))
				}
			</ul>
		)
	}
}

function mapStateToProps ({ categories }) {
	return {
		categories
	}
}

export default connect(mapStateToProps)(Category)