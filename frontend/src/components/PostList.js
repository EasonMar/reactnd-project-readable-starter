import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { timestampToTime } from '../utils/helper';

import Loading from 'react-loading';
import Category from './Category.js';


class PostList extends Component {
	componentWillMount(){
		// 获取所有post
		this.props.getPosts();
	}
  	render() {
		return (
			<div className="wrapper">
				<Category />
				<ul className="post_list">
					{this.props.posts.length === 0
						? <Loading delay={50} type='spokes' color='#222' className='loading' />
						: this.props.posts.map(post=>(
							<li key={post.id} style={{padding:'20px'}}>
								<Link to={`/detail?postId=${post.id}`} >
									<span className="post_title">{post.title}...</span>
								</Link>
								<span className="post_author">written-by {post.author}...</span>
								<span className="post_voteScore">voteScore {post.voteScore}...</span>
								<span className="post_commentCount">commentCount {post.commentCount}...</span>
								<span className="post_create_at">create-at {timestampToTime(post.timestamp)}</span>
							</li>
						))
					}
				</ul>
			</div>
		)
	}
}

function mapStateToProps ({ posts }) {
	return{
		// posts: [...posts]
		posts // 直接引用会有什么问题？
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts: () => dispatch(fetchPosts())
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PostList)