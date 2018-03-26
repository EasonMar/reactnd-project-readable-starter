import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from 'react-loading';
import sortBy from 'sort-by';
import Category from './Category.js';
import { fetchVotePost , sortOfPost } from '../actions';
import { timestampToTime, getUuid } from '../utils/helper';


class List extends Component {

	theSortPostFn = sortBy =>{
		const { postSort, sortPostFn } = this.props;
		// 如果点击的是当前已选的排序依据,则逆转Order即可
		if(sortBy === postSort.by){
			let order = postSort.order === 'des' ? 'asc' : 'des';
			sortPostFn(sortBy, order);
		}else{
			// 否则,则逆转排序依据,然后order变为默认的des-降序
			sortPostFn(sortBy, 'des');
		}
	}

  	render() {
  		const { posts, reqState, match, votePostFn, postSort } = this.props;
  		const sortIndex = postSort.by;
  		const order = postSort.order === 'asc' ? '' : '-';
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
						{content.length < 2 ? ''
							:<div className="sorter">
								<span className="note">sort-by</span>
								<span className={sortIndex==='voteScore'?'sortBy active':'sortBy'}
									onClick={()=>this.theSortPostFn('voteScore')}
								>
									vote score
									{sortIndex ==='voteScore' ? ` (${postSort.order})` : '' }
								</span>
								<span className={sortIndex==='voteScore'?'sortBy':'sortBy active'}
									onClick={()=>this.theSortPostFn('timestamp')}
								>
									update time
									{sortIndex ==='timestamp' ? ` (${postSort.order})` : '' }
								</span>
							</div>
						}
						<ul className="post_list">
							{content.length === 0
								? <li className="no_post">There are no posts yet.</li>
								: content.sort(sortBy(order+sortIndex)).map(post=>(
									<li key={post.id}>
										<div className="voter">
											<div className="up" onClick={()=>votePostFn(post.id, "upVote")}></div>
											<div className="down" onClick={()=>votePostFn(post.id,"downVote")}></div>
										</div>
										<Link to={{
											pathname: `/detail/${post.id}`,
											state: { category: cat }
										}} >
											<span className="post_title">{post.title}</span>
										</Link>
										<br />
										<span className="post_voteScore">votes：{post.voteScore}</span>
										<span className="post_commentCount">comments：{post.commentCount}</span>
										<span className="post_author">author：{post.author}</span>
										<span className="post_time">update_{timestampToTime(post.timestamp)}</span>
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

function mapStateToProps ({ posts, reqState, postSort }) {
	return{
		// posts: [...posts]
		posts, // 直接引用会有什么问题？
		reqState,
		postSort
	}
}

function mapDispatchToProps (dispatch) {
	return {
		votePostFn: (postId, option) => dispatch(fetchVotePost(postId, option)),
		sortPostFn: (by,order) => dispatch(sortOfPost(by,order))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))