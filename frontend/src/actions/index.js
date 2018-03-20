import * as API from '../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export const INIT_CATEGORY = 'INIT_CATEGORY';
export const REQ_STATE = 'REQ_STATE'; // 请求状态...

export const MODAL_STATUS = 'MODAL_STATUS';
export const MODAL_CONTENT = 'MODAL_CONTENT';

export const VOTE_POST = 'VOTE_POST';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export const SORT_POST = 'SORT_POST';
export const SORT_COMMENT = 'SORT_COMMENT';

// 获取所有posts
export const getPosts = postsArr => ({
	type: GET_POSTS,
	postsArr
})

// 增加post
export const addPost = postObj => ({
	type: ADD_POST,
	postObj
})

export const delPost = postId => ({
	type: DELETE_POST,
	postId
})

// 编辑
export const editPost = (postId, postObj) => ({
	type: EDIT_POST,
	postObj,
	postId
})

// 评论
export const getComments = (parentId, comments) => ({
	type: GET_COMMENTS,
	data: { parentId, comments }
})

export const addComment = (comment) => ({
	type: ADD_COMMENT,
	comment
})

export const editComment = (comment) => ({
	type: EDIT_COMMENT,
	comment
})

export const delComment = (parentId, commentId) => ({
	type: DELETE_COMMENT,
	parentId,
	commentId
})

// ===== 分类 =====
export const initCategory = categoryArr => ({
	type: INIT_CATEGORY,
	categoryArr
})

// ==== 请求状态 ====
export const reqState = state => ({
	type: REQ_STATE,
	state // 请求的状态
})

// modal的状态
export const modalStatus = status=> ({
	type: MODAL_STATUS,
	status
})

// modal的内容
export const modalContent = content=> ({
	type: MODAL_CONTENT,
	content
})

// 投票
export const voteForPost = (postObj) =>({
	type: VOTE_POST,
	postObj
})

export const voteForComment = (comment) =>({
	type: VOTE_COMMENT,
	comment
})

// 排序
export const sortOfPost = (by,order) => ({
	type: SORT_POST,
	by,
	order
})

export const sortOfComment = (by,order) => ({
	type: SORT_COMMENT,
	by,
	order
})

// ===== thunk =====
export const fetchPosts = () => dispatch => {
	dispatch(reqState('begin'));
	API.getPosts().then(postsArr => {
		dispatch(reqState('done'))
		dispatch(getPosts(postsArr))
	})
}

export const fetchAddPost = postData => dispatch => {
	dispatch(reqState('begin')); // 请求开始 --- 让新增页页面变成Loading,等待跳转到详情页
	return API.addPost(postData).then(postObj =>
	    dispatch(addPost(postObj)) // 请求结果
	).then(()=>dispatch(reqState('end')))
}

export const fetchDelPost = postId => dispatch => {
	return API.deletePost(postId).then(postObj =>
		dispatch(delPost(postObj.id)) // 传入then的参数是上一步的结果...这里为postObj
	)
}

export const fetchEditPost = (postId, postData) => dispatch => {
	return API.editPost(postId, postData).then(postObj =>
	    dispatch(editPost(postObj.id, postObj)) // 请求结果
	)
}

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

export const fetchCategories = () => dispatch => {
	dispatch(reqState('begin')); // 请求开始
	API.getCategories().then(categories => {
		dispatch(initCategory(categories))
	    dispatch(reqState('end')); // 请求结束
	})
}

export const fetchVotePost = (postId,option) => dispatch => {
	return API.voteForPost(postId,option).then(postObj =>
		dispatch(voteForPost(postObj))
	)
}

export const fetchVoteComment = (commentId,option) => dispatch => {
	return API.voteForComment(commentId,option).then(comment =>
		dispatch(voteForComment(comment))
	)
}