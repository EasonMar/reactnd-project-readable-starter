import * as API from '../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const INIT_CATEGORY = 'INIT_CATEGORY';
export const REQ_STATE = 'REQ_STATE'; // 请求状态...

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
export const getComments = (parentId,content) => ({
	type: GET_COMMENTS,
	content,
	parentId
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
	dispatch(reqState('begin')); // 请求开始 --- 让页面变成Loading,等待跳转到列表页
	return API.deletePost(postId).then(postObj =>
		dispatch(delPost(postObj.id)) // 传入then的参数是上一步的结果...这里为postObj
	).then(() => dispatch(reqState('end')))
}

export const fetchEditPost = (postId, postData) => dispatch => {
	dispatch(reqState('begin')); // 请求开始 --- 让编辑页页面变成Loading,等待跳转到详情页
	return API.editPost(postId, postData).then(postObj =>
	    dispatch(editPost(postObj.id, postObj)) // 请求结果
	).then(()=>dispatch(reqState('end')))
}

export const fetchComments = postId => dispatch => {
	API.getComments(postId).then(comments => {
		dispatch(getComments(postId,comments))
	})
}

export const fetchCategories = () => dispatch => {
	dispatch(reqState('begin')); // 请求开始
	API.getCategories().then(categories => {
		dispatch(initCategory(categories))
	    dispatch(reqState('end')); // 请求结束
	})
}