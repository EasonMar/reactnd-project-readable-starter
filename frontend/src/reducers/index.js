import { combineReducers } from 'redux';

// 引入各 reducer 文件
import { posts, postSort } from './post';
import { comments, commentSort } from './comment';
import { reqState, modal, categories } from './other';

// 原来我已经不知不觉做了Reducer拆分
export default combineReducers({
	posts,
	comments,
	categories,
	reqState,
	modal,
	postSort,
	commentSort
})

// 等价于：