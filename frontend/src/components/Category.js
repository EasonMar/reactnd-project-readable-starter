import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// 这是一个展示组件
const Category = ({ categories, cate }) =>(
	<ul className="Category">
		{
			categories.map(category=>(
				<li key={category.name}>
					<Link to={category.path}>
						{category.name === cate
							? <span style={{color: 'darkblue'}}>{category.name}</span>
							: <span>{category.name}</span>
						}
					</Link>
				</li>
			))
		}
	</ul>
)

// 其 connect 可以移到一个容器组件中执行
function mapStateToProps ({ categories }) {
	return {
		categories
	}
}

export default connect(mapStateToProps)(Category)