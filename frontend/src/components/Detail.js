import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchVotePost, fetchDelPost } from '../actions';

import Comments from './Comments.js';
import Loading from 'react-loading';
import { timestampToTime } from '../utils/helper';

class Detail extends Component {
	deleteFn(postId){
		const { del, history, location } = this.props;
		del(postId).then(()=>{
			const category = location.state.category;
			const url = category === 'Home' ? '/' : `/list/${category}`;
			history.replace(url); // 如何回退到具体的列表页？根据location.state.category(即使重新刷新页面,也能记录正确的category!)
		});
	}

	editFn(postId){
		const { history } = this.props;
		history.push({pathname:`/edit/${postId}`});    // 怎么跳转？history.pushState
	}

	render() {
		const { posts, match, votePostFn } = this.props;
		const post = posts.find(post => post.id === match.params.pid);
		return (
			post === undefined // 请求未完成
			? <Loading delay={50} type='spokes' color='#222' className='loading' />
			: <div className="post_detail">
				<div className="content">
					<div className="voter">
						<div className="up" onClick={()=>votePostFn(post.id, "upVote")}></div>
						<div className="down" onClick={()=>votePostFn(post.id,"downVote")}></div>
					</div>
					<h3>
						<span className={post.voteScore > 0? 'vote' : "vote nega"}>
							{ post.voteScore > 0 ? `+${post.voteScore}` : post.voteScore }
						</span>
						<span className="title">{post.title}</span>
					</h3>
					<div className="post_info">
						<span className="author">{post.author}</span>
						<span className="time">{timestampToTime(post.timestamp)}</span>
					</div>
					<p className="content">{post.body}</p>
					<button className="edit" onClick={()=>this.editFn(post.id)}>
						Edit The Post
					</button>
					<button className="delete" onClick={()=>this.deleteFn(post.id)}>
						Delete The Post
					</button>
					<Comments parentId={post.id} />
				</div>
			</div>
		)
	}
}

function mapStateToProps ({ posts }) {
	return {
		posts
	}
}

function mapDispatchToProps (dispatch) {
	return {
		votePostFn: (postId, option) => dispatch(fetchVotePost(postId, option)),
	    del: postId => dispatch(fetchDelPost(postId))
	}
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Detail))