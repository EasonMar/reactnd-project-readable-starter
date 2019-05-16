import * as API from '../utils/api';

// Action 类型

export const COMMENT_GET_ALL = 'COMMENT_GET_ALL';
export const COMMENT_ADD = 'COMMENT_ADD';
export const COMMENT_DELETE = 'COMMENT_DELETE';
export const COMMENT_EDIT = 'COMMENT_EDIT';

export const VOTE_COMMENT = 'VOTE_COMMENT';
export const SORT_COMMENT = 'SORT_COMMENT';


// Action 创建函数

// 评论
export const getComments = (parentId, comments) => ({
	type: COMMENT_GET_ALL,
	data: { parentId, comments }
})

export const addComment = (comment) => ({
	type: COMMENT_ADD,
	comment
})

export const editComment = (comment) => ({
	type: COMMENT_EDIT,
	comment
})

export const delComment = (parentId, commentId) => ({
	type: COMMENT_DELETE,
	parentId,
	commentId
})

// 投票
export const voteForComment = (comment) =>({
	type: VOTE_COMMENT,
	comment
})

// 排序
export const sortOfComment = (by,order) => ({
	type: SORT_COMMENT,
	by,
	order
})

// =====
// thunk

export const fetchComments = postId => dispatch => {
	API.getComments(postId).then(comments => {
		dispatch(getComments(postId,comments))
	})
}

export const fetchAddComment = commentData => dispatch => {
	return API.addComment(commentData).then(comment =>
		dispatch(addComment(comment))
	)
}

export const fetchEditComment = commentData => dispatch => {
	return API.editComment(commentData.id, commentData).then(comment =>
		dispatch(editComment(comment))
	)
}

export const fetchDelComment = commentId => dispatch => {
	return API.deleteComment(commentId).then(comment =>
		dispatch(delComment(comment.parentId, comment.id))
	)
}

export const fetchVoteComment = (commentId,option) => dispatch => {
	return API.voteForComment(commentId,option).then(comment =>
		dispatch(voteForComment(comment))
	)
}