import { combineReducers } from 'redux';
import { INIT_POSTS, GET_POSTS, GET_POST_DETAIL, INIT_COMMENTS, GET_COMMENTS } from '../actions';

const initState = [
	{
		id:null,
		title:null,
		body:null,
		author:null,
		voteScore:null,
		commentCount:null,
		timestamp:null
	}
]
function posts (state = initState, action){
	switch (action.type){
		case INIT_POSTS :
			return action.posts;
		case GET_POSTS :
			return [...state, ...action.posts];
		case GET_POST_DETAIL :
			return [action.post];
		default :
			return state;
	}
}

function comments (state = [], action){
	switch (action.type){
		case INIT_COMMENTS :
			return action.comments;
		case GET_COMMENTS :
			return [...state, ...action.comments];
		default :
			return state;
	}
}

export default combineReducers({
	posts,
	comments
})