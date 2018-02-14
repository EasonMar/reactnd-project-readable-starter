import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostDetail, fetchComments } from '../actions';
import { timestampToTime } from '../utils/helper';

import Loading from 'react-loading';

class PostDetail extends Component {
	componentWillMount(){
		const post_id = window.location.search.split('=')[1];
		this.props.postDetail(post_id);
		this.props.fetchComments(post_id);
	}
	render() {
		const { post, comments } = this.props;
		return (
			<div className="post_detail" style={{marginLeft:"50px"}}>
				{post.timestamp === 0
					? <Loading delay={50} type='spokes' color='#222' className='loading' />
					: <div className="content">
						<h2>{post.title}</h2>
						<div className="create">
							<span style={{paddingRight: "5px",fontSize:"10px"}}>{post.author}</span>
							<span style={{paddingRight: "5px",fontSize:"10px"}}>{post.voteScore}</span>
							<span style={{paddingRight: "5px",fontSize:"10px"}}>{post.commentCount}</span>
							<span style={{paddingRight: "5px",fontSize:"10px"}}>{timestampToTime(post.timestamp)}</span>
						</div>
						<p>{post.body}</p>
						<ul className="commentArea">
							{comments.map(com => (
								<li key={com.id}>
									<span style={{paddingRight: "5px",fontSize:"10px"}}>{com.body}</span>
									<span style={{paddingRight: "5px",fontSize:"10px"}}>{com.author}</span>
									<span style={{paddingRight: "5px",fontSize:"10px"}}>{com.voteScore}</span>
									<span style={{paddingRight: "5px",fontSize:"10px"}}>{timestampToTime(com.timestamp)}</span>
								</li>
							))}
						</ul>
					</div>}
			</div>
		)
	}
}

function mapStateToProps ({ postDetail,comments }) {
	return{
		post: postDetail,
		// comments: [...comments]
		// 直接引用会有什么问题？
		comments
	}
}

function mapDispatchToProps (dispatch) {
	return {
		postDetail: (postId) => dispatch(fetchPostDetail(postId)),
		fetchComments: (postId) =>dispatch(fetchComments(postId))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PostDetail)