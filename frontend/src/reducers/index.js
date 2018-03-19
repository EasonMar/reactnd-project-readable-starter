import { combineReducers } from 'redux';
import {
	GET_POSTS,
	ADD_POST,
	DELETE_POST,
	EDIT_POST,
	GET_COMMENTS,
	ADD_COMMENT,
	DELETE_COMMENT,
	EDIT_COMMENT,
	INIT_CATEGORY,
	REQ_STATE,
	MODAL_STATUS,
	MODAL_CONTENT,
	VOTE_POST,
	VOTE_COMMENT
} from '../actions';

// 估计也要优化state的结构为{},方便state的变更 --  但是API请求回来的就是Array
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
		case VOTE_POST :
			return state.map(post => {
				let newPost = action.postObj;
				if(post.id === newPost.id) return newPost;
				return post;
			})
		case ADD_COMMENT :
			let addCommentPost = state.find(post => post.id === action.comment.parentId);
			addCommentPost.commentCount++; // 实验证明,这样做直接修改了state？！
			return state; // 直接返回state都可以？！
		case DELETE_COMMENT :
			let delCommentPost = state.find(post => post.id === action.parentId);
			delCommentPost.commentCount--; // 实验证明,这样做直接修改了state！会有什么影响么？
			return state;
		default :
			return state;
	}
}

// 好恶心！结构需要优化 --- 用{}来组织或许会更方便编辑！
function comments (state = [], action){
	switch (action.type){
		case GET_COMMENTS :
			return [
				...state,
				action.data
			]
		case ADD_COMMENT :
			return [
				...state.filter(commentSet => commentSet.parentId !== action.comment.parentId), // 筛出其他comment集
				newComments(state,action)
			]
		case EDIT_COMMENT :
			return [
				...state.filter(commentSet => commentSet.parentId !== action.comment.parentId),
				newComments(state,action)
			]
		case DELETE_COMMENT :
			let involveComSet = state.find(commentSet => commentSet.parentId === action.parentId);
			involveComSet.comments = [
				...involveComSet.comments.filter(comment => comment.id !== action.commentId)
			]
			return [
				...state.filter(comment => comment.parentId !== action.parentId),
				involveComSet
			]
		case VOTE_COMMENT:
			return [
				...state.filter(commentSet=> commentSet.parentId !== action.comment.parentId),
				newComments(state,action)
			]
		default :
			return state;
	}

	// comment数据处理函数...
	function newComments(_state, _action){
		let nowInvolveCommentSet, involveCommentSet;
		// 查找需要处理的comment集对象
		involveCommentSet = _state.find(commentSet => commentSet.parentId === _action.comment.parentId);
		nowInvolveCommentSet = {
			...involveCommentSet,
			// 更新当前处理的comment集
			comments: [
				...involveCommentSet.comments.filter(comment => comment.id !== _action.comment.id),
				_action.comment
			]
		}
		return nowInvolveCommentSet;
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

function modal (state = {status:false,content:null}, action){
	switch (action.type){
		case MODAL_STATUS :
			return {
				...state,
				status : action.status
			}
		case MODAL_CONTENT :
			return {
				...state,
				content: action.content
			}
		default :
			return state;
	}
}

export default combineReducers({
	posts,
	comments,
	categories,
	reqState,
	modal
})