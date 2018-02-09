import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, getComments, getPosts } from '../actions';
import { timestampToTime } from '../utils/helper';


class PostList extends Component {
	componentWillMount(){
		this.props.fetchP()
	}
  render() {
    return (
    	<ul className="post_list">
    		{
    			this.props.posts.map(post=>(
    				<Link  key={post.id} to={
    					{
    						pathname:'/detail',
    						query: {postId: post.id}
    					}
    				}>
	    				<li>
	    					<span className="post_title">{post.title}...</span>
	    					<span className="post_author">written-by {post.author}...</span>
	    					<span className="post_voteScore">voteScore {post.voteScore}...</span>
	    					<span className="post_commentCount">commentCount {post.commentCount}...</span>
	    					<span className="post_create_at">create-at {post.time}</span>
	    				</li>
    				</Link>
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
			category: post.category,
			voteScore: post.voteScore,
			commentCount: post.commentCount,
			time: timestampToTime(post.timestamp)
		}))
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getP: (data) => dispatch(getPosts(data)),
		getC: (data) => dispatch(getComments(data)),
		fetchP: () => dispatch(fetchPosts())
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(PostList)