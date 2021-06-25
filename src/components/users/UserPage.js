import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { selectUserById } from './usersSlice';
import { selectPostByUser } from '../posts/postsSlice';

const UserPage = ({ match }) => {
	const { userId } = match.params;

	const user = useSelector(state => selectUserById(state, userId));

	const postsForUser = useSelector(state => selectPostByUser(state, userId));

	const postTitles = postsForUser.map(post => (
		<li key={post.id}>
			<Link
				style={{
					textDecoration: 'none',
					color: 'black',
					margin: '10px',
					fontSize: '18px',
				}}
				to={`/posts/${post.id}`}>
				{post.title}
			</Link>
		</li>
	));

	return (
		<section>
			<h2>{user.name}</h2>

			<ul>{postTitles}</ul>
		</section>
	);
};

UserPage.propTypes = {
	match: PropTypes.string,
};

export default UserPage;
