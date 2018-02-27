import { combineReducers } from 'redux';
import {
	GET_POSTS,
	GET_COMMENTS,
	POST_DETAIL,
	CLEAR_POST_DETAIL,
	CLEAR_COMMENTS_STATE,
	INIT_CATEGORY,
	CATEGORIZEPOST,
	CATEGORYSELECT,
	REQSTATE
} from '../actions';


function posts (state = [], action){
	switch (action.type){
		case GET_POSTS :
			return action.postsArr;
		case CATEGORIZEPOST :
			return action.postsArr;
		default :
			return state;
	}
}


const init_detail = {
	id: 0,
	timestamp: 0,
	title: null,
	body: null,
	author: null,
	category: null,
	voteScore: 0,
	commentCount: 0
}
function postDetail (state = init_detail, action){
	switch (action.type){
		case POST_DETAIL :
			return action.postObj;
		case CLEAR_POST_DETAIL :
			return {};
		default :
			return state;
	}
}

function comments (state = [], action){
	switch (action.type){
		case GET_COMMENTS :
			return action.comments;
		case CLEAR_COMMENTS_STATE :
			return [];
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

function cateSelect (state = 'default', action){
	switch (action.type){
		case CATEGORYSELECT :
			return action.category
		default :
			return state;
	}
}

function reqState (state = 'done', action){
	switch (action.type){
		case REQSTATE :
			return action.state
		default :
			return state;
	}
}

export default combineReducers({
	posts,
	postDetail,
	comments,
	categories,
	cateSelect,
	reqState
})