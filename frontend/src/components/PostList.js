import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategorizedPosts, hasPostDetail } from '../actions';
import { timestampToTime, getUuid } from '../utils/helper';

import Loading from 'react-loading';
import Category from './Category.js';


class PostList extends Component {
	componentWillMount(){
		switch (this.props.path){
			case 'react':
				this.props.categorizedPosts('react');
				break;
			case 'redux':
				this.props.categorizedPosts('redux');
				break;
			case 'udacity':
				this.props.categorizedPosts('udacity');
				break;
			default:
				this.props.categorizedPosts('default');
		}
		// 重设hasPostDetail为False - 进入postDetail页需要请求
		this.props.resetHasPostDetail();
	}
  	render() {
  		const { reqState, posts } = this.props;
		return (
			<div className="wrapper">
				<Category />
				{reqState === 'begin'
				? <Loading delay={50} type='spokes' color='#222' className='loading' />
				: <div className="list_content">
					<ul className="post_list">
						{posts.length === 0
							? <li className="no_post">尚无帖子……</li>
							: posts.map(post=>(
								<li key={post.id}>
									<Link to={`/detail?postId=${post.id}`} >
										<span className="post_title">{post.title}</span>
									</Link>
									<br />
									<span className="post_voteScore">vote: {post.voteScore}</span>
									<span className="post_commentCount">comment: {post.commentCount}</span>
									<span className="post_author">by: {post.author}</span>
									<span className="post_time">{timestampToTime(post.timestamp)}</span>
								</li>
							))
						}
					</ul>
					<Link to={`/create?postId=${getUuid()}`} className="add_post">Add Post</Link>
				  </div>
				}
			</div>
		)
	}
}

function mapStateToProps ({ posts,reqState }) {
	return{
		// posts: [...posts]
		posts, // 直接引用会有什么问题？
		reqState
	}
}

function mapDispatchToProps (dispatch) {
	return {
		categorizedPosts: category => dispatch(fetchCategorizedPosts(category)),
		resetHasPostDetail: () => dispatch(hasPostDetail(false))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PostList)