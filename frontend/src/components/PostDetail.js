import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timestampToTime } from '../utils/helper';


class PostDetail extends Component {
	render() {
		const { comments } = this.props;
		return (
			<div className="post_detail" style={{marginLeft:"50px"}}>
				<div className="content">
					<h2>title</h2>
					<div className="create">
						<span style={{paddingRight: "5px",fontSize:"10px"}}>author</span>
						<span style={{paddingRight: "5px",fontSize:"10px"}}>voteScore</span>
						<span style={{paddingRight: "5px",fontSize:"10px"}}>commentCount</span>
						<span style={{paddingRight: "5px",fontSize:"10px"}}>timestampToTimetimestamp</span>
					</div>
					<p>body</p>
				</div>
				<ul className="commentArea">
					{comments.map(com => (
						<li key={com.id}>
							<span style={{paddingRight: "5px",fontSize:"10px"}}>{com.body}</span>
							<span style={{paddingRight: "5px",fontSize:"10px"}}>{com.author}</span>
							<span style={{paddingRight: "5px",fontSize:"10px"}}>{com.voteScore}</span>
							<span style={{paddingRight: "5px",fontSize:"10px"}}>{timestampToTime(com.timestamp)}</span>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

function mapStateToProps ({ posts,comments }) {
	return{
		posts: posts.map(po =>({
			title: po.title,
			body: po.body,
			author: po.author,
			category: po.category,
			voteScore: po.voteScore,
			commentCount: po.commentCount,
			timestamp: po.timestamp
		})),
		comments: comments.map(com =>({
			id: com.id,
			parentId: com.parentId,
			body: com.body,
			author: com.author,
			voteScore: com.voteScore,
			timestamp: com.timestamp
		}))
	}
}

export default connect(mapStateToProps)(PostDetail)