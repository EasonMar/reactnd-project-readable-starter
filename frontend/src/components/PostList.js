import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchComments } from '../actions';
import { timestampToTime } from '../utils/helper';


class PostList extends Component {
  	render() {
		return (
			<ul className="post_list">
				{
					// 久不写,连onClick怎么传参都忘记了
					this.props.posts.map(post=>(
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
		posts: posts.map(post =>({
			id: post.id,
			title: post.title,
			body: post.body,
			author: post.author,
			category: post.category,
			voteScore: post.voteScore,
			commentCount: post.commentCount,
			timestamp: post.timestamp
		}))
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getComments: (postId) => dispatch(fetchComments(postId))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PostList)