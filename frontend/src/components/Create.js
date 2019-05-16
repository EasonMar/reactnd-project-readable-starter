import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAddPost } from '../actions/post';

import Loading from 'react-loading';

class Create extends Component {

	submit(){
		const { match, addPost, history } = this.props;
		const postData = {
			id: match.params.pid,
			timestamp: Date.now(),
			title: this.title.value || 'no_title',
			body: this.content.value || 'no_cotent',
			author: this.author.value || 'nobody',
			category: this.category.value
		}

		// 新增帖子 --- 异步跳至detail --- 同时带上当前category信息
		addPost(postData).then(() => history.replace({
			pathname: `/detail/${postData.id}`,
			state: {category: postData.category}
		}));
	}

	render() {
		const {categories, reqState, location } = this.props;
		const cateSelect = location.state.category === 'Home' ? 'react' : location.state.category;
		return(

			reqState === 'begin'
			? <Loading delay={50} type='spokes' color='#222' className='loading' />
			: <div className='createPost'>
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
				<button className="submit" onClick={()=>this.submit()}>submit</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Create)