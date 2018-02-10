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
export const addPost = (data) =>
    fetch(`${api}/posts`, {
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
export const voteForPost = (postId, option) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    }).then(res => res.json())

// Edit the details of an existing post
export const editPost = (postId, data) =>
    fetch(`${api}/posts/${postId}`, {
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
export const deletePost = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json())


// Get all the comments for a single post
export const getComments = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

// Add a comment to a post
export const addComment = (data) =>
    fetch(`${api}/comments`, {
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
export const voteForComment = (commentId, option) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    }).then(res => res.json())

// Edit the details of an existing comment
export const editComment = (commentId, data) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())

// Sets a comment's deleted flag to 'true'
export const deleteComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json())





// test API

/**
 * API - category
 */
/*API.getCategories().then(categories=>{
    console.log(categories);
});*/


/**
 * API - post
 */
/*API.getPosts().then(posts=>{
    console.log(posts); // [{post},{post}]
});*/

/*API.getCatPosts('react').then(posts=>{
    console.log(posts); // [{post},{post}]
});*/

// 新增帖子 - 返回对应帖子的内容
/*const post_param = {
    id: "test_123456",
    timestamp: Date.now(),
    title: "test_1",
    body: "test_1_content",
    author: "Eason",
    category: "test"
}
API.addPost(post_param).then(data=>{
    console.log(data);  // 返回{post}, 并新增voteScore、commentCount、deleted三个字段.
})*/

/*API.getPostDetail('test_123456').then(detail=>{
    console.log(detail); // 返回{post}
});*/

// 给帖子投票 - 返回对应帖子的内容
/*API.voteForPost('test_123456','upVote').then(post=>{
    console.log(post);  // 返回{post}
});*/

// 编辑帖子 - 返回对应帖子的内容
/*const edit_post = {
    title: 'test_update_title',
    body: 'test_update_body'
}
API.editPost('test_123456', edit_post).then(detail=>{
    console.log(detail);  // 返回{post}
});*/

// 删除帖子
/*API.deletePost('test_123456').then(res=>{
    console.log(res) // 返回{post},且delete字段变为true
});*/

/**
 * API - comment
 */
// 获取对应帖子的评论
/*API.getComments('test_123456').then(comments=>{
    console.log(comments);
});
API.getComments('8xf0y6ziyjabvozdd253nd').then(comments=>{
    console.log(comments);
});*/

// 添加评论
/*const comment_param = {
    id: 'test_comment_123',
timestamp: Date.now(),
body: 'test_comment_body',
author: 'nobody',
parentId: 'test_123456'
}
API.addComment(comment_param).then(res=>{
    console.log(res); // 返回当前评论的详情
})*/

// 获取评论的详情
/*API.getComment('test_comment_123').then(res=>{
    console.log(res);
})*/

// 给评论投票
/*API.voteForComment('test_comment_123').then(res=>{
    console.log(res);
})*/

// 编辑评论
/*const edit_comment = {
    timestamp: Date.now(),
    body: 'test_update_comment_body'
}
API.editComment('test_comment_123',edit_comment).then(res=>{
    console.log(res);
});*/

// 删除评论
/*API.deleteComment('test_comment_123').then(res=>{
    console.log(res); // 返回对应评论的信息,且delete字段变为true
})*/