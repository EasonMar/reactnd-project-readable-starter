import { combineReducers } from 'redux';
import { GET_POSTS, GET_COMMENTS } from '../actions';


function posts (state = [], action){
	switch (action.type){
		case GET_POSTS :
			return [...state, ...action.posts]
		default :
			return state
	}
}

function comments (state = [], action){
	switch (action.type){
	case GET_COMMENTS :
		return [...state, ...action.comments]
	default :
		return state
	}
}

export default combineReducers({
	posts,
	comments
})