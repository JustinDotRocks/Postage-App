import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [userId, setUserId] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState('idle');

	const dispatch = useDispatch();
	const users = useSelector(selectAllUsers);

	const onTitleChanged = e => setTitle(e.target.value);
	const onContentChanged = e => setContent(e.target.value);
	const onAuthorChanged = e => setUserId(e.target.value);

	const canSave =
		[title, content, userId].every(Boolean) && addRequestStatus === 'idle';

	const onSavePostClicked = async () => {
		if (canSave) {
			try {
				setAddRequestStatus('pending');
				const resultAction = await dispatch(
					addNewPost({ title, content, user: userId })
				);
				unwrapResult(resultAction);
				setTitle('');
				setContent('');
				setUserId('');
			} catch (err) {
				console.error('Failed to save the post: ', err);
			} finally {
				setAddRequestStatus('idle');
			}
		}
	};
	const usersOptions = users.map(user => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	return (
		<section
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '20px',
			}}>
			<h2 style={{ color: '#0089aa', fontSize: '28px' }}>Add a New Post</h2>
			<form style={{ margin: '10px' }}>
				<label style={{ margin: '10px', color: '#0089aa', fontWeight: 'bold' }}>
					Post Title:
				</label>
				<input
					style={{
						margin: '10px',
						border: '2px solid #0089aa',
						borderRadius: '5px',
					}}
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleChanged}
				/>
				<label style={{ margin: '10px', color: '#0089aa', fontWeight: 'bold' }}>
					Author:
				</label>
				<select
					style={{
						margin: '10px',
						border: '2px solid #0089aa',
						borderRadius: '5px',
					}}
					id="postAuthor"
					value={userId}
					onChange={onAuthorChanged}>
					<option value=""></option>
					{usersOptions}
				</select>
				<label style={{ margin: '10px', color: '#0089aa', fontWeight: 'bold' }}>
					Content:
				</label>
				<textarea
					style={{
						color: '#0089aa',
						border: '2px solid #0089aa',
						borderRadius: '5px',
					}}
					id="postContent"
					name="postContent"
					value={content}
					onChange={onContentChanged}
				/>
				<button
					style={{
						margin: '10px',
						border: '2px solid #0089aa',
						borderRadius: '5px',
						width: '80px',
						height: '30px',
						backgroundColor: '#0089aa',
						color: 'white',
					}}
					type="button"
					onClick={onSavePostClicked}
					disabled={!canSave}>
					Save Post
				</button>
			</form>
		</section>
	);
};

export default AddPostForm;
