import * as API from '../utils/api';

// Action 类型

export const CATEGORY_INIT = 'CATEGORY_INIT';
export const REQ_STATE = 'REQ_STATE'; // 当前请求的状态...

export const MODAL_STATUS = 'MODAL_STATUS';
export const MODAL_CONTENT = 'MODAL_CONTENT';

// Action 创建函数

// ===== 分类 =====
export const initCategory = categoryArr => ({
	type: CATEGORY_INIT,
	categoryArr
})

// ==== 请求状态 ====
export const reqState = stateOfReq => ({
	type: REQ_STATE,
	stateOfReq // 请求的状态
})

// modal的状态
export const modalStatus = status=> ({
	type: MODAL_STATUS,
	status
})

// modal的内容
export const modalContent = content=> ({
	type: MODAL_CONTENT,
	content
})

// =====
// thunk

export const fetchCategories = () => dispatch => {
	dispatch(reqState('begin')); // 请求开始
	API.getCategories().then(categories => {
		dispatch(initCategory(categories))
	    dispatch(reqState('end')); // 请求结束
	})
}