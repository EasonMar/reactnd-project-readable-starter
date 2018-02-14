import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, clearPostDetail, clearCommentsState } from '../actions';
import { timestampToTime } from '../utils/helper';

import Loading from 'react-loading';


class PostList extends Component {
	componentWillMount(){
		// 获取所有post
		this.props.getPosts();
		// 要不要清空comments\PostDetail的状态...感觉很不和谐！
		this.props.clearCommentsState();
		this.props.clearPostDetail();
	}
  	render() {
		return (
			<ul className="post_list">
				{	this.props.posts.length === 0
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
		)
	}
}

function mapStateToProps ({ posts }) {
	return{
		// posts: [...posts]
		// 直接引用会有什么问题？
		posts
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts: () => dispatch(fetchPosts()),
	    clearCommentsState: () => dispatch(clearCommentsState()),
	    clearPostDetail: () => dispatch(clearPostDetail())
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PostList)