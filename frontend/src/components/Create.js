import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAddPost } from '../actions';

import Loading from 'react-loading';

class CreatePost extends Component {

	submit(){
		const {match,addPost,history} = this.props;
		const post_param = {
			id: match.params.pid,
			timestamp: Date.now(),
			title: this.title.value || 'no_title',
			body: this.content.value || 'no_cotent',
			author: this.author.value || 'nobody',
			category: this.category.value
		}

		// 新增帖子 --- 如何异步跳至 detail?
		addPost(post_param).then(()=>history.replace(`/detail/${post_param.id}`));
	}

	render() {
		const {categories, reqState, location } = this.props;
		const cateSelect = location.state.category === 'Home' ? 'react' : location.state.category;
		return(
			<div className='createPost'
				style={{pading: '20px',width: '50%',margin: '10px auto'}}
			>
				{
					reqState === 'begin'
					? <Loading delay={50} type='spokes' color='#222' className='loading' />
					: <div className='innerForm'>
						<label>Title:
							<input
								type='text'
								className='title'
								ref={input=> this.title = input}
								style={{marginLeft:'10px'}}
							/>
						</label>
						<br /><br />
						<label>author:
							<input
								type='text'
								className='author'
								ref={input=> this.author = input}
								style={{marginLeft:'10px'}}
							/>
						</label>
						<br /><br />
						<label>Category:
							<select
								className='category'
								ref={select=> this.category = select}
								style={{marginLeft:'10px'}}
								defaultValue={cateSelect}
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
							></textarea>
						</label>
						<br /><br />
						<button onClick={()=>this.submit()}>submit</button>
					</div>

				}

			</div>
		)
	}
}

function mapStateToProps ({ categories, reqState }) {
	return {
		categories,
		reqState
	}
}

function mapDispatchToProps (dispatch) {
	return {
		addPost: postParam => dispatch(fetchAddPost(postParam))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)