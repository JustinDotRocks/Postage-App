import React from 'react';
//import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { selectPostById } from './postsSlice';

const SinglePostPage = ({ match }) => {
	const { postId } = match.params;

	const post = useSelector(state => selectPostById(state, postId));

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}

	return (
		<section>
			<article style={{ margin: '10px' }}>
				<h2 style={{ color: '#0089aa' }}>{post.title}</h2>
				<div style={{ margin: '10px', color: '#0089aa' }}>
					<PostAuthor userId={post.user} />
					<TimeAgo timestamp={post.date} />
				</div>
				<p style={{ margin: '10px', fontSize: '18px' }}>{post.content}</p>
				<div style={{ margin: '10px' }}>
					<Link
						to={`/editPost/${post.id}`}
						style={{
							textDecoration: 'none',
							color: '#0089aa',
							fontWeight: 'bold',
						}}>
						Edit Post
					</Link>
				</div>
				<ReactionButtons post={post} />
			</article>
		</section>
	);
};

SinglePostPage.propTypes = {
	match: PropTypes.string,
};

export default SinglePostPage;
