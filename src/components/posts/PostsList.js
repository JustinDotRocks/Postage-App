import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { fetchPosts, selectPostIds, selectPostById } from './postsSlice';

const PostExcerpt = ({ postId }) => {
	const post = useSelector(state => selectPostById(state, postId));
	return (
		<article
			style={{
				margin: '5px',
				border: '2px solid #0089aa',
				borderRadius: '15px',
				padding: '10px',
				width: '40vw',
			}}
			key={post.id}>
			<h3 style={{ margin: '5px', color: '#0089aa' }}>{post.title}</h3>
			<div style={{ margin: '5px', color: '#0089aa' }}>
				<PostAuthor userId={post.user} />
				<TimeAgo timestamp={post.date} />
			</div>
			<p style={{ margin: '5px' }}>{post.content.substring(0, 100)}</p>

			<ReactionButtons post={post} />
			<div style={{ margin: '10px' }}>
				<Link
					to={`/posts/${post.id}`}
					style={{
						textDecoration: 'none',
						color: '#0089aa',
						fontWeight: '700',
					}}>
					View Post
				</Link>
			</div>
		</article>
	);
};

const PostsList = () => {
	const orderedPostIds = useSelector(selectPostIds);
	const dispatch = useDispatch();

	const postStatus = useSelector(state => state.posts.status);
	const error = useSelector(state => state.posts.error);

	useEffect(() => {
		if (postStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postStatus, dispatch]);

	let content;

	if (postStatus === 'loading') {
		content = <div>Loading...</div>;
	} else if (postStatus === 'succeeded') {
		content = orderedPostIds.map(postId => (
			<PostExcerpt key={postId} postId={postId} />
		));
	} else if (postStatus === 'error') {
		content = <div>{error}</div>;
	}

	return (
		<section
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<h2>Posts</h2>
			{content}
		</section>
	);
};

export default PostsList;
