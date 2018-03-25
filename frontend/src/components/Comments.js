import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, fetchDelComment, modalStatus, modalContent, fetchVoteComment, sortOfComment } from '../actions';
import UpdateComment from './UpdateComment'
import { timestampToTime } from '../utils/helper';
import { List,Button } from 'antd';
import Loading from 'react-loading';
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
			/*myComment === undefined // 请求未完成
			? <Loading delay={50} type='spokes' color='#222' className='loading' />
			: <div className="commentArea">
				<h4>Comment Area</h4>
				<div className="sorter">
					<span className="note">sort-by</span>
					<span className={sortIndex==='voteScore'?'sortBy active':'sortBy'}
						onClick={()=>this.theSortComment('voteScore')}
					>
						vote score
						{sortIndex ==='voteScore' ? (order === '-' ? ' -' : ' +') : '' }
					</span>
					<span className={sortIndex==='voteScore'?'sortBy':'sortBy active'}
						onClick={()=>this.theSortComment('timestamp')}
					>
						update time
						{sortIndex ==='timestamp' ? (order === '-' ? ' -' : ' +') : '' }
					</span>
				</div>
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
			</div>*/
			myComment === undefined // 请求未完成
			? <Loading delay={50} type='spokes' color='#222' className='loading' />
			: <div className="commentArea">
				<h3>Comment Area</h3>
				<div className="sorter">
					<span className="note">sort-by</span>
					<span className={sortIndex==='voteScore'?'sortBy active':'sortBy'}
						onClick={()=>this.theSortComment('voteScore')}
					>
						vote score
						{sortIndex ==='voteScore' ? (order === '-' ? ' -' : ' +') : '' }
					</span>
					<span className={sortIndex==='voteScore'?'sortBy':'sortBy active'}
						onClick={()=>this.theSortComment('timestamp')}
					>
						update time
						{sortIndex ==='timestamp' ? (order === '-' ? ' -' : ' +') : '' }
					</span>
				</div>
				<List
					loading={myComment===undefined}
					itemLayout="horizontal"
					dataSource={myComment.comments.sort(sortBy(order+sortIndex))}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								title={item.body}
								description={`vote:${item.voteScore}  by:${item.author}  update:${timestampToTime(item.timestamp)}`}
							/>
							<Button type="primary" onClick={()=> this.openModal(item)}>edit</Button>
							<Button type="danger" onClick={()=> delComment(item.id)}>del</Button>
						</List.Item>
					)}
				/>

				<Button type="primary"onClick={()=> this.openModal()}>Add Comment</Button>
				<UpdateComment parentId={parentId} />
			</div>
		)
	}
}

function mapStateToProps ({ comments,commentSort }) {
	return{
		// comments: [...comments]
		comments, // 直接引用会有什么问题？
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