// 引入 Action type
import { 
	CATEGORY_INIT, 
	REQ_STATE, 
	MODAL_STATUS, 
	MODAL_CONTENT 
} from '../actions/other';

export function categories (Categories = [], action){
	switch (action.type){
		case CATEGORY_INIT :
			return action.categoryArr
		default :
			return Categories;
	}
}

export function reqState (stateOfReq = 'end', action){
	switch (action.type){
		case REQ_STATE :
			return action.stateOfReq
		default :
			return stateOfReq;
	}
}

export function modal (stateOfModal = {status:false,content:null}, action){
	switch (action.type){
		case MODAL_STATUS :
			return {
				...stateOfModal,
				status : action.status
			}
		case MODAL_CONTENT :
			return {
				...stateOfModal,
				content: action.content
			}
		default :
			return stateOfModal;
	}
}