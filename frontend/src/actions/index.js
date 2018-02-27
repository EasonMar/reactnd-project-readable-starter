import * as API from '../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const POST_DETAIL = 'POST_DETAIL';
export const CLEAR_POST_DETAIL = 'CLEAR_POST_DETAIL'; // 清除当前帖子详情
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';

export const GET_COMMENTS = 'GET_COMMENTS';
export const CLEAR_COMMENTS_STATE = 'CLEAR_COMMENTS_STATE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const INIT_CATEGORY = 'INIT_CATEGORY';
export const CATEGORYSELECT = 'CATEGORYSELECT';
export const CATEGORIZEPOST = 'CATEGORIZEPOST';

export const REQSTATE = 'REQSTATE'; // 请求状态...

export const getPosts = postsArr => ({
	type: GET_POSTS,
	postsArr
})

export const postDetail = postObj => ({
	type: POST_DETAIL,
	postObj
})

export const clearPostDetail = () => ({
	type: CLEAR_POST_DETAIL
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
	type: CATEGORIZEPOST,
	postsArr  // 分类后的posts
})

export const categorySelect = category => ({
	type: CATEGORYSELECT,
	category  // 分类后的posts
})

// ==== 请求状态 ====
export const reqState = state => ({
	type: REQSTATE,
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
	dispatch(reqState('begin'));
	API.getPostDetail(postId).then(postsArr => {
		dispatch(reqState('done'))
		dispatch(postDetail(postsArr))
	})
}

export const fetchComments = postId => dispatch => {
	dispatch(reqState('begin'));
	API.getComments(postId).then(comments => {
		dispatch(reqState('done'))
		dispatch(getComments(comments))
	})
}

export const fetchCategories = () => dispatch => {
	dispatch(reqState('begin'));
	API.getCategories().then(categories => {
		dispatch(reqState('done'))
		dispatch(initCategory(categories))
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