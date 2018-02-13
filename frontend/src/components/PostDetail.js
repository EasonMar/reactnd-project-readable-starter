import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments, getPosts } from '../actions';
import { timestampToTime } from '../utils/helper';


class PostDetail extends Component {
	componentWillMount(){

	}
  render() {
  	console.log(this.props);
    return (
    	<ul className="post_detail">
    		<li>{this.props.id}</li>
    		<li>{this.props.title}</li>
    		<li>{this.props.body}</li>
    		<li>{this.props.author}</li>
    		<li>{this.props.category}</li>
    		<li>{this.props.voteScore}</li>
    		<li>{this.props.time}</li>
    	</ul>
    )
  }
}

function mapStateToProps ({ posts,comments }) {
	return{
		posts: posts.map(post =>({
			id: post.id,
			title: post.title,
			body: post.body,
			author: post.author,
			category: post.category,
			voteScore: post.voteScore,
			commentCount: post.commentCount,
			time: timestampToTime(post.timestamp)
		})),
		comments: null
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getP: (data) => dispatch(getPosts(data)),
		getC: (data) => dispatch(getComments(data)),
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(PostDetail)