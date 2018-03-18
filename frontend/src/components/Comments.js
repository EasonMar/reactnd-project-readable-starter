import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, fetchDelComment, modalStatus, modalContent } from '../actions';
import UpdateComment from './UpdateComment'
import Loading from 'react-loading';
import { timestampToTime } from '../utils/helper';

class Comments extends Component {
	componentWillMount(){
		const { comments, parentId, fetchComments } = this.props;
		// 如果找不到对应的postId记录,则请求服务端
		if(!comments.find(comment => comment.parentId === parentId)){
			fetchComments(parentId);
		}
	}

	// 打开Modal
	openModal(content){
		var realContent = content || null;
		const {modalContent,modalStatus} = this.props;
		modalStatus(true);
		modalContent(realContent);
	}

	render() {
		const { comments, parentId, delComment } = this.props;
		const myComment = comments.find(com => com.parentId === parentId );
		return (
			myComment === undefined // 请求未完成
			? <Loading delay={50} type='spokes' color='#222' className='loading' />
			: <div className="commentArea">
				<h4>Comment Area</h4>
				<ul className="commentList">
					{
						myComment.comments.length === 0
						? <li className="no_comment"><span>Come to make the first comment!</span></li>
						: myComment.comments.map(com => (
							<li key={com.id}>
								<div className="voter">
									<div className="up"></div>
									<div className="down"></div>
								</div>
								<span className="score">{com.voteScore}</span>
								<span>{com.body}</span>
								<span className="author">{com.author}</span>
								<span className="time">{timestampToTime(com.timestamp)}</span>
								<button className="edit"
									onClick={()=> this.openModal(com)}
								>edit</button>
								<button onClick={()=> delComment(com.id)}>del</button>
							</li>
						))
					}
				</ul>

				<button className="add"
					onClick={()=> this.openModal()}
				>Add comment</button>

				<UpdateComment parentId={parentId} />
			</div>
		)
	}
}

function mapStateToProps ({ comments }) {
	return{
		// comments: [...comments]
		comments // 直接引用会有什么问题？
	}
}

function mapDispatchToProps (dispatch) {
	return {
		fetchComments: postId =>dispatch(fetchComments(postId)),
		delComment: commentId => dispatch(fetchDelComment(commentId)),
		modalStatus: status => dispatch(modalStatus(status)),
		modalContent: content => dispatch(modalContent(content)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Comments)