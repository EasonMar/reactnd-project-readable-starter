import * as API from '../utils/api';
import { reqState } from './other';

// Action 类型

export const POST_GET_ALL = 'POST_GET_ALL';
export const POST_ADD = 'POST_ADD';
export const POST_DELETE = 'POST_DELETE';
export const POST_EDIT = 'POST_EDIT';

export const VOTE_POST = 'VOTE_POST';
export const SORT_POST = 'SORT_POST';


// Action 创建函数

// 获取所有posts
export const getPosts = postsArr => ({
	type: POST_GET_ALL,
	postsArr
})

// 增加post
export const addPost = postObj => ({
	type: POST_ADD,
	postObj
})

export const delPost = postId => ({
	type: POST_DELETE,
	postId
})

// 编辑
export const editPost = (postId, postObj) => ({
	type: POST_EDIT,
	postObj,
	postId
})

// 投票
export const voteForPost = (postObj) =>({
	type: VOTE_POST,
	postObj
})

// 排序
export const sortOfPost = (by,order) => ({
	type: SORT_POST,
	by,
	order
})

// =====
// thunk 
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

export const fetchVotePost = (postId,option) => dispatch => {
	return API.voteForPost(postId,option).then(postObj =>
		dispatch(voteForPost(postObj))
	)
}