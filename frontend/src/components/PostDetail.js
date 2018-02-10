import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInitComments,fetchPostDetail } from '../actions';
import { timestampToTime } from '../utils/helper';


class PostDetail extends Component {
	componentWillMount(){
		const queryId = window.location.search.split('=')[1];
		this.props.getPostDetail(queryId); // 因为这两货是异步的...有可能执行完render,他们的action还没派发出去,导致状态还是旧的...
		this.props.initComments(queryId); // 因为这两货是异步的...有可能执行完render,他们的action还没派发出去,导致状态还是旧的...
	}
	render() {
		const { posts, comments } = this.props;
		const { title,body,author,voteScore,commentCount,time } = posts[0];
		return (
			<div className="post_detail" style={{marginLeft:"50px"}}>
				<div className="content">
					<h2>{title}</h2>
					<div className="create">
						<span style={{paddingRight: "5px",fontSize:"10px"}}>{author}</span>
						<span style={{paddingRight: "5px",fontSize:"10px"}}>{voteScore}</span>
						<span style={{paddingRight: "5px",fontSize:"10px"}}>{commentCount}</span>
						<span style={{paddingRight: "5px",fontSize:"10px"}}>{time}</span>
					</div>
					<p>{body}</p>
				</div>
				{ comments.length > 0 ?
					(<ul className="commentArea">
						{comments.map(com => (
							<li key={com.id}>
								<span style={{paddingRight: "5px",fontSize:"10px"}}>{com.body}</span>
								<span style={{paddingRight: "5px",fontSize:"10px"}}>{com.author}</span>
								<span style={{paddingRight: "5px",fontSize:"10px"}}>{com.voteScore}</span>
								<span style={{paddingRight: "5px",fontSize:"10px"}}>{com.time}</span>
							</li>
						))}
					</ul>) : null
				}
			</div>
		)
	}
}

function mapStateToProps ({ posts,comments }) {
	return{
		posts: posts.map(post =>({
			title: post.title,
			body: post.body,
			author: post.author,
			category: post.category,
			voteScore: post.voteScore,
			commentCount: post.commentCount,
			time: timestampToTime(post.timestamp)
		})),
		comments: comments.map(comment =>({
			id: comment.id,
			parentId: comment.parentId,
			body: comment.body,
			author: comment.author,
			voteScore: comment.voteScore,
			time: timestampToTime(comment.timestamp)
		}))
	}
}

function mapDispatchToProps (dispatch) {
	return {
		initComments: (postId) => dispatch(fetchInitComments(postId)),
		getPostDetail: (postId) => dispatch(fetchPostDetail(postId))
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(PostDetail)