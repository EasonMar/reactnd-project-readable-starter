import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategorizedPosts } from '../actions';
import { timestampToTime } from '../utils/helper';

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
	}
  	render() {
		return (
			<div className="wrapper">
				<Category />
				<ul className="post_list">
					{this.props.reqState === 'begin'
						? <Loading delay={50} type='spokes' color='#222' className='loading' />
						: this.props.posts.length === 0
							? <li style={{padding:'20px'}}>尚无帖子……</li>
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

function mapStateToProps ({ posts,reqState }) {
	return{
		// posts: [...posts]
		posts, // 直接引用会有什么问题？
		reqState
	}
}

function mapDispatchToProps (dispatch) {
	return {
		categorizedPosts: category => dispatch(fetchCategorizedPosts(category))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PostList)