import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, fetchDelComment, fetchVoteComment, sortOfComment } from '../actions/comment';
import {modalStatus, modalContent } from '../actions/other';
import UpdateComment from './UpdateComment'
import Loading from 'react-loading';
import { timestampToTime } from '../utils/helper';
import sortBy from 'sort-by';

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

	// 评论排序
	theSortComment = sortBy =>{
		const { commentSort, sortCommentFn } = this.props;
		// 如果点击的是当前已选的排序依据,则逆转Order即可
		if(sortBy === commentSort.by){
			let order = commentSort.order === 'des' ? 'asc' : 'des';
			sortCommentFn(sortBy, order);
		}else{
			// 否则,则逆转排序依据,然后order变为默认的des-降序
			sortCommentFn(sortBy, 'des');
		}
	}

	render() {
		const { comments, parentId, delComment, voteComment, commentSort } = this.props;
		const myComment = comments.find(com => com.parentId === parentId );
		const sortIndex = commentSort.by;
  		const order = commentSort.order === 'asc' ? '' : '-';
		return (
			myComment === undefined // 请求未完成
			? <Loading delay={50} type='spokes' color='#222' className='loading' />
			: <div className="commentArea">
				<h4>Comment Area</h4>
				{myComment.comments.length < 2 ? ''
				: <div className="sorter">
					<span className="note">sort-by</span>
					<span className={sortIndex==='voteScore'?'sortBy active':'sortBy'}
						onClick={()=>this.theSortComment('voteScore')}
					>
						vote score
						{sortIndex ==='voteScore' ? ` (${commentSort.order})` : '' }
					</span>
					<span className={sortIndex==='voteScore'?'sortBy':'sortBy active'}
						onClick={()=>this.theSortComment('timestamp')}
					>
						update time
							{sortIndex ==='timestamp' ? ` (${commentSort.order})` : '' }
					</span>
				  </div>
				}
				<ul className="commentList">
					{
						myComment.comments.length === 0
						? <li className="no_comment"><span>Come to make the first comment!</span></li>
						: myComment.comments.sort(sortBy(order+sortIndex)).map(com => (
							<li key={com.id}>
								<div className="voter">
									<div className="up" onClick={()=> voteComment(com.id, 'upVote')}></div>
									<div className="down" onClick={()=> voteComment(com.id, 'downVote')}></div>
								</div>
								<span className={com.voteScore > 0 ? "score" : "score nega"}>
									{ com.voteScore > 0 ? `+${com.voteScore}` : com.voteScore }
								</span>
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

function mapStateToProps ({ comments,commentSort }) {
	return{
		// comments: [...comments]
		comments, // 直接引用state会有什么问题？
		commentSort
	}
}

function mapDispatchToProps (dispatch) {
	return {
		fetchComments: postId => dispatch(fetchComments(postId)),
		delComment: commentId => dispatch(fetchDelComment(commentId)),
		voteComment: (commentId,option) => dispatch(fetchVoteComment(commentId,option)),
		modalStatus: status => dispatch(modalStatus(status)),
		modalContent: content => dispatch(modalContent(content)),
		sortCommentFn: (by, order) => dispatch(sortOfComment(by, order))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Comments)