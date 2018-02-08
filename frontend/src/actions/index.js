import * as API from '../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';


export const getPosts = posts => ({
	type: GET_POSTS,
	posts
})


export const getComments = comments => ({
	type: GET_COMMENTS,
	comments
})

// thunk action - 还不知道用它来干啥.
export const fetchPosts = () => dispatch => (
	API.getPosts().then(posts => dispatch(getPosts(posts)))
)