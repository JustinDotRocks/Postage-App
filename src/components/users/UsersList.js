import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectAllUsers } from './usersSlice';

const UserList = () => {
	const users = useSelector(selectAllUsers);

	const renderedUsers = users.map(user => (
		<li style={{ margin: '10px' }} key={user.id}>
			<Link
				style={{ textDecoration: 'none', color: '#0089aa' }}
				to={`/users/${user.id}`}>
				{user.name}
			</Link>
		</li>
	));

	return (
		<section style={{ margin: '10px' }}>
			<h2>Users</h2>
			<ul style={{ margin: '10px' }}>{renderedUsers}</ul>
		</section>
	);
};

export default UserList;
