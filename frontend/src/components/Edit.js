import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEditPost } from '../actions';

import Loading from 'react-loading';

class Edit extends Component {

	submit(){
		const { match, editPost, history } = this.props;
		const postData = {
			timestamp: Date.now(),
			title: this.title.value || 'no_title',
			body: this.content.value || 'no_cotent',
			author: this.author.value || 'nobody',
			category: this.category.value
		}
		const postId = match.params.pid;
		// 编辑帖子 --- 异步跳至回detail --- 直接用go(-1)跳回到detail页.再次goback则回到进入编辑之前的category,合情合理
		editPost(postId, postData)
		.then(() => history.go(-1))
		.catch(error => alert(error)); // 可以这样处理错误了！
	}

	render() {
		const { posts, categories, match } = this.props;
		const post = posts.find(post => post.id === match.params.pid);
		return(
			post === undefined // 请求未完成
			? <Loading delay={50} type='spokes' color='#222' className='loading' />
			: <div className='editPost'>
				<label>Title:
					<input
						type='text'
						className='title'
						ref={input=> this.title = input}
						style={{marginLeft:'10px'}}
						defaultValue={post.title}
					/>
				</label>
				<br /><br />
				<label>author:
					<input
						type='text'
						className='author'
						ref={input=> this.author = input}
						style={{marginLeft:'10px'}}
						defaultValue={post.author}
					/>
				</label>
				<br /><br />
				<label>Category:
					<select
						className='category'
						ref={select=> this.category = select}
						style={{marginLeft:'10px'}}
						defaultValue={post.category}
					>
						{
							categories.filter(cate => cate.name !== 'Home').map(cate => (
								<option
									key={cate.name}
									value={cate.name}
								>
									{cate.name}
								</option>
							))
						}
					</select>
				</label>
				<br /><br />
				<label>Content:
					<br />
					<textarea
						style={{width: '400px',height: '160px', resize:'none'}}
						ref={input=> this.content = input}
						defaultValue={post.body}
					></textarea>
				</label>
				<br /><br />
				<button className="submit" onClick={()=>this.submit()}>submit</button>
			</div>
		)
	}
}

function mapStateToProps ({ posts, categories }) {
	return {
		posts,
		categories
	}
}

function mapDispatchToProps (dispatch) {
	return {
		editPost: (postId, postData) => dispatch(fetchEditPost(postId, postData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)