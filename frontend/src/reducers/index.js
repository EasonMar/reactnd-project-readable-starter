import { combineReducers } from 'redux'
import { INIT_POSTS, INIT_COMMENTS } from '../actions'


function posts (state = [], action){
	switch (action.type){
		case INIT_POSTS :
			return [...state, ...action.posts]
		default :
			return state
	}
}

function comments (state = [], action){
	switch (action.type){
	case INIT_COMMENTS :
		return [...state, ...action.comments]
	default :
		return state
	}
}

export default combineReducers({
	posts,
	comments
})