import React, { Component } from 'react'

import { connect } from 'react-redux'
import { initPosts, initComments } from '../actions'
import { timestampToTime } from '../utils/helper'
import * as API from '../utils/api';

class App extends Component {
	componentWillMount(){
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
		API.getPosts().then(posts=>{
			this.props.initP(posts);
		});

		/*API.getCatPosts('react').then(posts=>{
			console.log(posts);
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
			console.log(data);  // 返回的帖子多了voteScore、commentCount、deleted三个字段.
		})*/

		/*API.getPostDetail('test_123456').then(detail=>{
			console.log(detail);
		});*/

		// 给帖子投票 - 返回对应帖子的内容
		/*API.voteForPost('test_123456','upVote').then(post=>{
			console.log(post);
		});*/

		// 编辑帖子 - 返回对应帖子的内容
		/*const edit_post = {
			title: 'test_update_title',
			body: 'test_update_body'
		}
		API.editPost('test_123456', edit_post).then(detail=>{
			console.log(detail);
		});*/

		// 删除帖子
		/*API.deletePost('test_123456').then(res=>{
			console.log(res) // 返回对应帖子的信息,且delete字段变为true
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
	}
  render() {
    return (
    	<div>
      <h1 style={{textAlign:"center",color:'#aaa'}}>Welcome to Readable</h1>
      <ul>

      </ul>
      </div>
    );
  }
}

function mapStateToProps ({ posts, comments }) {
	return{
		posts: posts.map(post =>({
			id: post.id,
			title: post.title,
			author: post.author,
			category: post.category,
			voteScore: post.voteScore,
			commentCount: post.commentCount,
			time: timestampToTime(post.timestamp)
		}))
	}
}

function mapDispatchToProps (dispatch) {
	return {
		initP: (data) => dispatch(initPosts(data)),
		initC: (data) => dispatch(initComments(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
