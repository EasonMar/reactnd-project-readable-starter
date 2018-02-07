export const INIT_POSTS = 'INIT_POSTS'
export const INIT_COMMENTS = 'INIT_COMMENTS'

export function initPosts (posts) {
	return{
		type: INIT_POSTS,
		posts
	}
}


export function initComments (comments) {
	return {
		type: INIT_COMMENTS,
		comments
	}
}
