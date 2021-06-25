import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { postUpdated, selectPostById } from './postsSlice';

const EditPostForm = ({ match }) => {
	const { postId } = match.params;

	const post = useSelector(state => selectPostById(state, postId));

	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);

	const dispatch = useDispatch();
	const history = useHistory();

	const onTitleChanged = e => setTitle(e.target.value);
	const onContentChanged = e => setContent(e.target.value);

	const onSavePostclicked = () => {
		if (title && content) {
			dispatch(postUpdated({ id: postId, title, content }));
			history.push(`/posts/${postId}`);
		}
	};

	return (
		<section
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<h2 style={{ margin: '15px', color: '#0089aa', fontWeight: 'bold' }}>
				Edit Post
			</h2>
			<form
				style={{
					margin: '15px',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<label
					style={{ marginRight: '15px', color: '#0089aa', fontWeight: 'bold' }}>
					Post Title:
				</label>
				<input
					style={{
						marginRight: '15px',
						width: '300px',
						height: '30px',
						padding: '5px',
						border: '2px solid #0089aa',
						borderRadius: '10px',
					}}
					type="text"
					id="postTitle"
					name="postTitle"
					placeholder="What's on your mind?"
					value={title}
					onChange={onTitleChanged}
				/>
				<label
					style={{ marginRight: '15px', color: '#0089aa', fontWeight: 'bold' }}>
					Content:
				</label>
				<textarea
					style={{
						padding: '15px',
						border: '2px solid #0089aa',
						borderRadius: '10px',
					}}
					id="postContent"
					name="postContent"
					value={content}
					onChange={onContentChanged}
				/>
			</form>
			<button
				style={{
					margin: '15px',
					width: '100px',
					height: '30px',
					backgroundColor: '#0089aa',
					color: 'white',
					border: 'none',
					borderRadius: '10px',
				}}
				type="button"
				onClick={onSavePostclicked}>
				Save Post
			</button>
		</section>
	);
};

EditPostForm.propTypes = {
	match: PropTypes.string,
};

export default EditPostForm;
