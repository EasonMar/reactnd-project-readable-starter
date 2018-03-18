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
	MODAL_CONTENT
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
		case ADD_COMMENT :
			const {parentId} = action.data;
			let addCommentPost = state.find(post => post.id === parentId);
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
			const { parentId, comment } = action.data;
			let addPostComments = state.find(comment => comment.parentId === parentId); // 查找需要处理的comment集
			addPostComments.comments.push(comment); // 给comment集增加评论
			return [
				...state.filter(comment => comment.parentId !== parentId),
				addPostComments
			]
		case EDIT_COMMENT :
			let editPostComments = state.find(comment => comment.parentId === action.data.parentId);
			editPostComments.comments = [
				...editPostComments.comments.filter(comment => comment.id !== action.data.comment.id),
				action.data.comment
			]
			return [
				...state.filter(comment => comment.parentId !== parentId),
				editPostComments
			]
		case DELETE_COMMENT :
			let delPostComments = state.find(comment => comment.parentId === action.parentId);
			delPostComments.comments = [
				...delPostComments.comments.filter(comment => comment.id !== action.commentId)
			]
			return [
				...state.filter(comment => comment.parentId !== action.parentId),
				delPostComments
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