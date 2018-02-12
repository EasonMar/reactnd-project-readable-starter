import * as API from '../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';


export const getPosts = posts => ({
	type: GET_POSTS,
	posts
})

export const getComments = comments => ({
	type: GET_COMMENTS,
	comments
})

// thunk
export const fetchPosts = () => dispatch => (
	API.getPosts().then(posts => dispatch(getPosts(posts)))
)

export const fetchComments = (postId) => dispatch => (
	API.getComments(postId).then(comments => dispatch(getComments(comments)))
)