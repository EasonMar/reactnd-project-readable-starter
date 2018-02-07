/**
 * 封装api
 */
const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/**
 * Get all of the categories available for the app. List is found in categories.js.
 * Feel free to extend this list as you desire.
 */
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

// Get all of the posts. Useful for the main page when no category is selected.
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

// Get all of the posts for a particular category
export const getCatPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

// Add a new post
export const addPost = (data)=>
	fetch(`${api}/posts`,{
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(res => res.json())

// Get the details of a single post
export const getPostDetail = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

// Used for voting on a post
export const voteForPost = (postId,option)=>
	fetch(`${api}/posts/${postId}`,{
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({option})
	}).then(res => res.json())

// Edit the details of an existing post
export const editPost = (postId,data)=>
	fetch(`${api}/posts/${postId}`,{
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(res => res.json())

/**
 * Sets the deleted flag for a post to 'true'.
 * Sets the parentDeleted flag for all child comments to 'true'.
 */
export const deletePost = (postId)=>
	fetch(`${api}/posts/${postId}`,{
		method: 'DELETE',
		headers
	}).then(res => res.json())


// Get all the comments for a single post
export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

// Add a comment to a post
export const addComment = (data)=>
	fetch(`${api}/comments`,{
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(res => res.json())

// Get the details for a single comment
export const getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())

// Used for voting on a comment.
export const voteForComment = (commentId,option)=>
	fetch(`${api}/comments/${commentId}`,{
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({option})
	}).then(res => res.json())

// Edit the details of an existing comment
export const editComment = (commentId,data)=>
	fetch(`${api}/comments/${commentId}`,{
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(res => res.json())

	// Sets a comment's deleted flag to 'true'
	export const deleteComment = (commentId)=>
	fetch(`${api}/comments/${commentId}`,{
		method: 'DELETE',
		headers
	}).then(res => res.json())