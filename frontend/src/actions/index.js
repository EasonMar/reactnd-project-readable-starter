import * as API from '../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const POST_DETAIL = 'POST_DETAIL';
export const CLEAR_POST_DETAIL = 'CLEAR_POST_DETAIL'; // 清除当前帖子详情
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST'; // 貌似用不上
export const EDIT_POST = 'EDIT_POST';
export const HAS_POST_DETAIL = 'HAS_POST_DETAIL';

export const GET_COMMENTS = 'GET_COMMENTS';
export const CLEAR_COMMENTS_STATE = 'CLEAR_COMMENTS_STATE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const INIT_CATEGORY = 'INIT_CATEGORY';
export const CATEGORY_SELECT = 'CATEGORY_SELECT';
export const CATEGORIZE_POST = 'CATEGORIZE_POST';

export const REQ_STATE = 'REQ_STATE'; // 请求状态...

// 获取所有posts
export const getPosts = postsArr => ({
	type: GET_POSTS,
	postsArr
})

// 获取post detail
export const postDetail = postObj => ({
	type: POST_DETAIL,
	postObj
})

// 清除post detail
export const clearPostDetail = () => ({
	type: CLEAR_POST_DETAIL
})

// 增加post
export const addPost = postObj => ({
	type: ADD_POST,
	postObj
})

export const editPost = postObj => ({
	type: EDIT_POST,
	postObj
})

// 当前是否具有最新的post detail
// 用来区分从post列表页 - 新增/编辑页 等不同渠道进入详情页时的情况
// 那什么时候清理次状态 - 进入post列表页时
// 什么时候置位 - 进入新增/编辑页时
export const hasPostDetail = hasDetail =>({
	type: HAS_POST_DETAIL,
	hasDetail
})

export const getComments = comments => ({
	type: GET_COMMENTS,
	comments
})

export const clearCommentsState = () => ({
	type: CLEAR_COMMENTS_STATE
})

export const initCategory = categoryArr => ({
	type: INIT_CATEGORY,
	categoryArr
})

// ===== 分类 =====
export const categorizePost = postsArr => ({
	type: CATEGORIZE_POST,
	postsArr  // 分类后的posts
})

export const categorySelect = category => ({
	type: CATEGORY_SELECT,
	category  // 分类后的posts
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

export const fetchPostDetail = postId => dispatch => {
	API.getPostDetail(postId).then(postObj => {
		dispatch(postDetail(postObj))
	})
}

export const fetchAddPost = postParam => dispatch => {
	dispatch(reqState('begin')); // 请求开始 --- 让新增/编辑页页面变成Loading,等待跳转到详情页
	API.addPost(postParam).then(postObj => {
	    dispatch(addPost(postObj)) // 请求结果
	    // 设定详情页是否需要请求的状态
	    dispatch(hasPostDetail(true));
	    // 跳转到详情页 ---- 这样跳转会导致页面重载...
	    window.location.replace(`/detail?postId=${postParam.id}`)
	})
}

export const fetchDelPost = postId => dispatch => {
	dispatch(reqState('begin')); // 请求开始 --- 让页面变成Loading,等待跳转到列表页
	API.deletePost(postId).then(() => {
	    // 回跳
	    window.history.go(-1)
	})
}

export const fetchComments = postId => dispatch => {
	API.getComments(postId).then(comments => {
		dispatch(getComments(comments))
	})
}

export const fetchCategories = () => dispatch => {
	dispatch(reqState('begin')); // 请求开始
	API.getCategories().then(categories => {
		dispatch(initCategory(categories))
	    dispatch(reqState('end')); // 请求结束
	})
}

// 一个thunk包含2个action,解决2个状态
export const fetchCategorizedPosts = category => dispatch => {
	dispatch(reqState('begin'));
	category === 'default'
	? API.getPosts().then(postsArr => {
		dispatch(reqState('done'));
		dispatch(getPosts(postsArr));
		dispatch(categorySelect(category)); // 改变categorySelect
	})
	: API.getCatPosts(category).then(postsArr => {
		dispatch(reqState('done'));
		dispatch(categorizePost(postsArr, category))
		dispatch(categorySelect(category)); // 改变categorySelect
	})
}