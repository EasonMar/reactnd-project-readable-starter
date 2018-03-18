import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { modalStatus, modalContent, fetchAddComment, fetchEditComment } from '../actions';
import { getUuid } from '../utils/helper';

class UpdateComment extends Component {

	componentWillMount() {
	    Modal.setAppElement('#root');
	}

	// 使用箭头函数,使closeModal内的this指向UpdateComment上下文
	closeModal = () => {
		const { modalContent, modalStatus } = this.props;
		modalStatus(false);
		modalContent(null);
	}

	submit() {
		const { parentId, addComment, editComment, modalContent, modalStatus } = this.props;
		const { content } = this.props.modal;
		const commentData = {
			id: content ? content.id : getUuid(),
			timestamp: Date.now(),
			body: this.content.value,
			author: this.author.value,
			parentId: parentId
		}

		const createOrEdit = content ? editComment : addComment;
		createOrEdit(commentData).then(()=>{
			modalStatus(false);
			modalContent(null);
		})
	}

	render() {
		const { status, content } = this.props.modal;
		return(
			<Modal
				className='modal'
				overlayClassName='overlay'
				isOpen={status}
				onRequestClose={this.closeModal}
				contentLabel='Modal'
	        >
	        	<div className='update_comment'>
					<label>author:
						<input
							type='text'
							className='author'
							ref={input=> this.author = input}
							style={{marginLeft:'10px'}}
							defaultValue={content ? content.author : ''}
						/>
					</label>
					<br /><br />
					<label>Content:
						<br />
						<textarea
							style={{width: '400px',height: '160px', resize:'none'}}
							ref={input=> this.content = input}
							defaultValue={content ? content.body : ''}
						></textarea>
					</label>
					<br /><br />
					<button className="submit" onClick={()=>this.submit()}>submit</button>
				</div>
	        </Modal>
		)
	}
}

function mapStateToProps ({ modal }) {
	return {
		modal
	}
}

function mapDispatchToProps (dispatch) {
	return {
		modalStatus: status => dispatch(modalStatus(status)),
		modalContent: content => dispatch(modalContent(content)),
		addComment: commentData => dispatch(fetchAddComment(commentData)),
		editComment: commentData => dispatch(fetchEditComment(commentData))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateComment)