import { combineReducers } from 'redux';
import {
	GET_POSTS,
	POST_DETAIL,
	CLEAR_POST_DETAIL,
	ADD_POST,
	EDIT_POST,
	HAS_POST_DETAIL,
	GET_COMMENTS,
	CLEAR_COMMENTS_STATE,
	INIT_CATEGORY,
	CATEGORIZE_POST,
	CATEGORY_SELECT,
	REQ_STATE
} from '../actions';


function posts (state = [], action){
	switch (action.type){
		case GET_POSTS :
			return action.postsArr;
		case CATEGORIZE_POST :
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
		case ADD_POST :
			return action.postObj;
		case EDIT_POST :
			return action.postObj;
		default :
			return state;
	}
}

function hasPostDetail (state = false, action){
	switch (action.type){
		case HAS_POST_DETAIL :
			return action.hasDetail
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
		case CATEGORY_SELECT :
			return action.category
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
	postDetail,
	hasPostDetail,
	comments,
	categories,
	cateSelect,
	reqState
})