import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from 'react-loading';
import Category from './Category.js';
import { fetchVotePost } from '../actions';
import { timestampToTime, getUuid } from '../utils/helper';


class List extends Component {
  	render() {
  		const { posts, reqState, match, votePost } = this.props;

  		// 当前分类/路由
  		const cat = match.params.cat || 'Home';
  		const content = cat === 'Home' ? posts : posts.filter( post => post.category === cat);
		return (
			<div className="wrapper">
				<Category cate={cat} />
				{
					reqState === 'begin' // 请求未完成
					? <Loading delay={50} type='spokes' color='#222' className='loading' />
					: <div className="list_content">
						<ul className="post_list">
							{content.length === 0
								? <li className="no_post">Don't have post yet</li>
								: content.map(post=>(
									<li key={post.id}>
										<div className="voter">
											<div className="up" onClick={()=>votePost(post.id, "upVote")}></div>
											<div className="down" onClick={()=>votePost(post.id,"downVote")}></div>
										</div>
										<Link to={{
											pathname: `/detail/${post.id}`,
											state: { category: cat }
										}} >
											<span className="post_title">{post.title}</span>
										</Link>
										<br />
										<span className="post_voteScore">vote: {post.voteScore}</span>
										<span className="post_commentCount">comment: {post.commentCount}</span>
										<span className="post_author">by: {post.author}</span>
										<span className="post_time">{timestampToTime(post.timestamp)}</span>
									</li>
								))
							}
						</ul>
						<Link className="add_post" to={{
							pathname: `/create/${getUuid()}`,
    						state: { category: cat }
						}}>Add Post</Link>
					</div>
				}
			</div>
		)
	}
}

function mapStateToProps ({ posts, reqState }) {
	return{
		// posts: [...posts]
		posts, // 直接引用会有什么问题？
		reqState
	}
}

function mapDispatchToProps (dispatch) {
	return {
		votePost: (postId, option) => dispatch(fetchVotePost(postId, option)),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))