import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDelPost } from '../actions';

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
		const { posts, match } = this.props;
		const post = posts.find(post => post.id === match.params.pid);
		return (
			post === undefined // 请求未完成
			? <Loading delay={50} type='spokes' color='#222' className='loading' />
			: <div className="post_detail">
				<div className="content">
					<h3>
						{post.voteScore > 0
							? <span className="vote posi">+{post.voteScore}</span>
							: <span className="vote nega">{post.voteScore}</span>
						}
						<span className="title">{post.title}</span>
					</h3>
					<div className="post_info">
						<span className="author">{post.author}</span>
						<span className="time">{timestampToTime(post.timestamp)}</span>
					</div>
					<p className="content">{post.body}</p>
					<Comments parentId={post.id} />
					<button className="edit"
							style={{marginRight: '20px'}}
							onClick={()=>this.editFn(post.id)}
					>
						Edit
					</button>
					<button className="delete" onClick={()=>this.deleteFn(post.id)}>
						Delete
					</button>
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
	    del: postId => dispatch(fetchDelPost(postId))
	}
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Detail))