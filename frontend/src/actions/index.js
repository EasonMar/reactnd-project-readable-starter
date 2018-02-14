import * as API from '../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const CLEAR_COMMENTS_STATE = 'CLEAR_COMMENTS_STATE';
export const POST_DETAIL = 'POST_DETAIL';
export const CLEAR_POST_DETAIL = 'CLEAR_POST_DETAIL';

export const INIT_CATEGORY = 'INIT_CATEGORY';
export const CATEGORIZE = 'CATEGORIZE';

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

export const categorize = (postsArr,category) => ({
	type: CATEGORIZE,
	postsArr,
	category
})


// thunk
export const fetchPosts = () => dispatch => (
	API.getPosts().then(posts => dispatch(getPosts(posts)))
)

export const fetchComments = (postId) => dispatch => (
	API.getComments(postId).then(comments => dispatch(getComments(comments)))
)

export const fetchPostDetail = (postId) => dispatch => (
	API.getPostDetail(postId).then(posts => dispatch(postDetail(posts)))
)

export const fetchCategories = () => dispatch => (
	API.getCategories().then(categories => dispatch(initCategory(categories)))
)