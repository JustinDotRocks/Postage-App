import React from 'react';

import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
	thumbsUp: '👍',
	hooray: '🎉',
	heart: '❤️',
	rocket: '🚀',
	eyes: '👀',
};

const ReactionButtons = ({ post }) => {
	const dispatch = useDispatch();

	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
				style={{
					margin: '5px',
					width: '40px',
					height: '30px',
					backgroundColor: '#0089aa',
					color: 'white',
					border: 'none',
					borderRadius: '5px',
				}}
				key={name}
				type="button"
				onClick={() =>
					dispatch(reactionAdded({ postId: post.id, reaction: name }))
				}>
				{emoji} {post.reactions[name]}
			</button>
		);
	});

	return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
