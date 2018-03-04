import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostDetail, fetchComments, clearPostDetail, clearCommentsState, fetchDelPost } from '../actions';
import { timestampToTime, getQueryString } from '../utils/helper';

import Loading from 'react-loading';

class PostDetail extends Component {
	componentWillMount(){
		const post_id = getQueryString('postId');
		// 先清空comments的旧状态
		this.props.clearPostDetail();
		// 获取comments的新状态
		this.props.fetchComments(post_id);
		// 如果当前没有最新的post_detail,则需要请求
		if(!this.props.hasPostDetail){
			// 先清空comments的旧状态
			this.props.clearCommentsState();
			// 获取comments的新状态
 			this.props.postDetail(post_id);
		}
	}
	render() {
		const { post, comments, reqState } = this.props;
		return (
			<div className="post_detail">
				{reqState === 'begin'
					? <Loading delay={50} type='spokes' color='#222' className='loading' />
					: <div className="content">
						<h3>
							{post.voteScore > 0
								? <span className="vote posi">+{post.voteScore}</span>
								: <span className="vote nega">{post.voteScore}</span>
							}
							<span className="title">{post.title}</span>
						</h3>
						<div className="post_info">
							<span className="author">{post.author}</span>
							<span className="time">{timestampToTime(post.timestamp)}</span>
						</div>
						<p className="content">{post.body}</p>
						<ul className="commentArea">
							{comments.map(com => (
								<li key={com.id}>
									<span>{com.body}</span>
									<span>{com.author}</span>
									<span>{com.voteScore}</span>
									<span>{timestampToTime(com.timestamp)}</span>
								</li>
							))}
						</ul>
						<button className="delete_post"
							onClick={()=>this.props.delPost(post.id)}
						>Delete the Post</button>
					</div>}
			</div>
		)
	}
}

function mapStateToProps ({ postDetail,comments,hasPostDetail,reqState }) {
	return{
		post: postDetail,
		// comments: [...comments]
		comments, // 直接引用会有什么问题？
		hasPostDetail,
		reqState
	}
}

function mapDispatchToProps (dispatch) {
	return {
		postDetail: postId => dispatch(fetchPostDetail(postId)),
		fetchComments: postId =>dispatch(fetchComments(postId)),
		clearCommentsState: () => dispatch(clearCommentsState()),
	    clearPostDetail: () => dispatch(clearPostDetail()),
	    delPost: postId => dispatch(fetchDelPost(postId))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PostDetail)