import { combineReducers } from 'redux';
import {
	GET_POSTS,
	ADD_POST,
	// EDIT_POST,
	GET_COMMENTS,
	INIT_CATEGORY,
	REQ_STATE
} from '../actions';


function posts (state = [], action){
	switch (action.type){
		case GET_POSTS :
			return action.postsArr;
		case ADD_POST :
			return [
				...state,
				action.postObj
			]
		default :
			return state;
	}
}

// 结构需要优化
function comments (state = [], action){
	switch (action.type){
		case GET_COMMENTS :
			return [
				...state,
				{
					parentId: action.parentId,
					content: action.content
				}
			]
		default :
			return state;
	}
}

function categories (state = [], action){
	switch (action.type){
		case INIT_CATEGORY :
			return action.categoryArr
		default :
			return state;
	}
}

function reqState (state = 'done', action){
	switch (action.type){
		case REQ_STATE :
			return action.state
		default :
			return state;
	}
}

export default combineReducers({
	posts,
	comments,
	categories,
	reqState
})