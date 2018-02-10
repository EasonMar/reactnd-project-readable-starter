import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchInitPosts } from '../actions';
import { timestampToTime } from '../utils/helper';


class PostList extends Component {
	componentWillMount(){
		this.props.initPosts()
	}
  	render() {
		return (
			<ul className="post_list">
				{
					this.props.posts.map(post=>(
						<li key={post.id}>
							<Link to={`/detail?postId=${post.id}`} >
								<span className="post_title">{post.title}...</span>
							</Link>
							<span className="post_author">written-by {post.author}...</span>
							<span className="post_voteScore">voteScore {post.voteScore}...</span>
							<span className="post_commentCount">commentCount {post.commentCount}...</span>
							<span className="post_create_at">create-at {post.time}</span>
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
			author: post.author,
			voteScore: post.voteScore,
			commentCount: post.commentCount,
			time: timestampToTime(post.timestamp)
		}))
	}
}

function mapDispatchToProps (dispatch) {
	return {
		initPosts: () => dispatch(fetchInitPosts())
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(PostList)