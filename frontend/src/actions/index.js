import * as API from '../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const CLEAR_COMMENTS_STATE = 'CLEAR_COMMENTS_STATE';
export const POST_DETAIL = 'POST_DETAIL';
export const CLEAR_POST_DETAIL = 'CLEAR_POST_DETAIL';

export const INIT_CATEGORY = 'INIT_CATEGORY';
export const CATEGORYSELECT = 'CATEGORYSELECT';
export const CATEGORIZEPOST = 'CATEGORIZEPOST';

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';


export const getPosts = postsArr => ({
	type: GET_POSTS,
	postsArr
})

export const getComments = comments => ({
	type: GET_COMMENTS,
	comments
})

export const postDetail = postObj => ({
	type: POST_DETAIL,
	postObj
})

export const clearPostDetail = () => ({
	type: CLEAR_POST_DETAIL
})

export const clearCommentsState = () => ({
	type: CLEAR_COMMENTS_STATE
})

export const initCategory = categoryArr => ({
	type: INIT_CATEGORY,
	categoryArr
})

// 分类
export const categorizePost = (postsArr) => ({
	type: CATEGORIZEPOST,
	postsArr  // 分类后的posts
})

export const categorySelect = (category) => ({
	type: CATEGORYSELECT,
	category  // 分类后的posts
})

// thunk
export const fetchPosts = () => dispatch => (
	API.getPosts().then(postsArr => dispatch(getPosts(postsArr)))
)

export const fetchComments = postId => dispatch => (
	API.getComments(postId).then(comments => dispatch(getComments(comments)))
)

export const fetchPostDetail = postId => dispatch => (
	API.getPostDetail(postId).then(postsArr => dispatch(postDetail(postsArr)))
)

export const fetchCategories = () => dispatch => (
	API.getCategories().then(categories => dispatch(initCategory(categories)))
)

export const fetchCategorizedPosts = (category) => dispatch => {
	dispatch(categorySelect(category)); // 先改变categorySelect
	category === 'default'
	? API.getPosts().then(postsArr => dispatch(getPosts(postsArr)))
	: API.getCatPosts(category).then(postsArr => dispatch(categorizePost(postsArr, category)))
}