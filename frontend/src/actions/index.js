import * as API from '../utils/api';

export const INIT_POSTS = 'INIT_POSTS';
export const GET_POSTS = 'GET_POSTS';
export const GET_POST_DETAIL = 'GET_POST_DETAIL';


export const INIT_COMMENTS = 'INIT_COMMENTS';
export const GET_COMMENTS = 'GET_COMMENTS';


export const initPosts = posts => ({
	type: INIT_POSTS,
	posts
})

export const getPosts = posts => ({
	type: GET_POSTS,
	posts
})

export const getPostDetail = post => ({
	type: GET_POST_DETAIL,
	post
})

export const initComments = comments => ({
	type: INIT_COMMENTS,
	comments
})

export const getComments = comments => ({
	type: GET_COMMENTS,
	comments
})

// thunk action - 还不知道用它来干啥.
export const fetchInitPosts = () => dispatch => (
	API.getPosts().then(posts => dispatch(initPosts(posts)))
)

export const fetchPosts = () => dispatch => (
	API.getPosts().then(posts => dispatch(getPosts(posts)))
)

export const fetchPostDetail = (postId) => dispatch => (
	API.getPostDetail(postId).then(post => dispatch(getPostDetail(post)))
)

export const fetchInitComments = (postId) => dispatch => (
	API.getComments(postId).then(comments => dispatch(initComments(comments)))
)

