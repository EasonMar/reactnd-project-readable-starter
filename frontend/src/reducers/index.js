import { combineReducers } from 'redux';
import {
	GET_POSTS,
	ADD_POST,
	DELETE_POST,
	EDIT_POST,
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
		case DELETE_POST :
			return state.filter(post => post.id !== action.postId)
		case EDIT_POST :
			// state.filter(post => post.id !== action.postId).push(action.postObjs) --- push会改变原来的数组,然后返回元素数量
			return [
				...state.filter(post => post.id !== action.postId),
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
		case DELETE_POST :
			return state.filter(post => post.parentId !== action.postId)
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