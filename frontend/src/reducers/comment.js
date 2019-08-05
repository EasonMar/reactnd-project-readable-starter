// 评论不应该跟帖子分开吧？
// 不过有时候评论是在进入到某个具体到帖子内部时才会向后端请求！

// 能否用其父id作为他们的key，范式化它们?

import { 
	COMMENT_GET_ALL, 
	COMMENT_ADD, 
	COMMENT_DELETE, 
	COMMENT_EDIT, 
	VOTE_COMMENT, 
	SORT_COMMENT 
} from '../actions/comment';

// 好恶心！Comments 结构需要优化 --- 用{}来组织或许会更方便编辑！
export function comments (Comments = [], action){
	switch (action.type){
		case COMMENT_GET_ALL :
			return [
				...Comments,
				action.data
			]
		case COMMENT_ADD :
			return [
				...Comments.filter(commentSet => commentSet.parentId !== action.comment.parentId), // 筛出其他comment集
				newComments(Comments,action)
			]
		case COMMENT_EDIT :
			return [
				...Comments.filter(commentSet => commentSet.parentId !== action.comment.parentId),
				newComments(Comments,action)
			]
		case COMMENT_DELETE :
			let involveComSet = Comments.find(commentSet => commentSet.parentId === action.parentId);
			involveComSet.comments = [
				...involveComSet.comments.filter(comment => comment.id !== action.commentId)
			]
			return [
				...Comments.filter(comment => comment.parentId !== action.parentId),
				involveComSet
			]
		case VOTE_COMMENT:
			return [
				...Comments.filter(commentSet=> commentSet.parentId !== action.comment.parentId),
				newComments(Comments,action)
			]
		default :
			return Comments;
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

export function commentSort (stateOfCommentSort = {by:'voteScore',order:'des'}, action){
	let {by,order} = action;
	switch ( action.type ){
		case SORT_COMMENT :
			return {by, order }
		default :
			return stateOfCommentSort
	}
}