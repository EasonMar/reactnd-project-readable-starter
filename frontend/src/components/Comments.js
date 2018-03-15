import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions';

import Loading from 'react-loading';
import { timestampToTime } from '../utils/helper';

class Comments extends Component {
	componentWillMount(){
		const { comments, parentId, fetchComments } = this.props;
		// 如果找不到对应的postId记录,则请求服务端
		if(!comments.find(comment => comment.parentId === parentId)){
			fetchComments(parentId);
		}
	}
	render() {
		const { comments, parentId } = this.props;
		const myComment = comments.find(com => com.parentId === parentId );
		return (
			myComment === undefined // 请求未完成
			? <Loading delay={50} type='spokes' color='#222' className='loading' />
			: <ul className="commentArea">
				{
					myComment.content.length === 0
					? <li className="no_comment">尚无评论……</li>
					: myComment.content.map(com => (
						<li key={com.id}>
							<span>{com.body}</span>
							<span>{com.author}</span>
							<span>{com.voteScore}</span>
							<span>{timestampToTime(com.timestamp)}</span>
						</li>
					))
				}
			</ul>
		)
	}
}

function mapStateToProps ({ comments }) {
	return{
		// comments: [...comments]
		comments // 直接引用会有什么问题？
	}
}

function mapDispatchToProps (dispatch) {
	return {
		fetchComments: postId =>dispatch(fetchComments(postId)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Comments)