// 引入 Action type
import { POST_GET_ALL, POST_ADD, POST_DELETE, POST_EDIT, VOTE_POST, SORT_POST } from '../actions/post';
import { COMMENT_ADD, COMMENT_DELETE } from '../actions/comment';

// 估计也要优化 stateOfPosts 的结构为{},方便 stateOfPosts 的变更 --  但是API请求回来的就是Array
export function posts (stateOfPosts = [], action){
	switch (action.type){
		case POST_GET_ALL :
			return action.postsArr;
		case POST_ADD :
			return [
				...stateOfPosts,
				action.postObj
			]
		case POST_DELETE :
			return stateOfPosts.filter(post => post.id !== action.postId)
		case POST_EDIT :
			// stateOfPosts.filter(post => post.id !== action.postId).push(action.postObjs) --- push会改变原来的数组,然后返回元素数量
			return [
				...stateOfPosts.filter(post => post.id !== action.postId),
				action.postObj
			]
		case VOTE_POST :
			return stateOfPosts.map(post => {
				let newPost = action.postObj;
				if(post.id === newPost.id) return newPost;
				return post;
			})
		case COMMENT_ADD :
			let addCommentPost = stateOfPosts.find(post => post.id === action.comment.parentId);
			addCommentPost.commentCount++; // 实验证明,这样做直接修改了stateOfPosts？！
			return stateOfPosts; // 直接返回stateOfPosts都可以？！
		case COMMENT_DELETE :
			let delCommentPost = stateOfPosts.find(post => post.id === action.parentId);
			delCommentPost.commentCount--; // 实验证明,这样做直接修改了stateOfPosts！会有什么影响么？
			return stateOfPosts;
		default :
			return stateOfPosts;
	}
}

// 排序的依据-by,只支持voteScore和timestamp两种依据,默依据vote
// 顺序order有asc升序和des降序两种,默认降序
export function postSort (stateOfPostSort = {by:'voteScore',order:'des'}, action){
	let {by,order} = action;
	switch ( action.type ){
		case SORT_POST :
			return {by, order }
		default :
			return stateOfPostSort
	}
}