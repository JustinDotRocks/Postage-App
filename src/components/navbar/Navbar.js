import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
	fetchNotifications,
	selectAllNotifications,
} from '../notifications/notificationsSlice';

const NavBarContainer = styled.nav`
	background-color: #0089aa;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 4em;
	border-bottom: 3px solid #008894;
`;

const NavItemsList = styled.ul`
	display: flex;
	flex-direction: row;
	list-style-type: none;
`;

const NavItem = styled.li`
	margin-left: 1.2rem;

	> * {
		text-decoration: none;
		color: white;
	}
`;
const NotificationsContainer = styled.div`
	display: flex;
	align-items: center;
	list-style-type: none;
	margin-right: 2em;
`;

const NotificationsButton = styled.button`
	color: #0089aa;
	background-color: white;
	margin-left: 1em;
	padding: 0.4em;
	border-radius: 10px;
`;

const Navbar = () => {
	const dispatch = useDispatch();
	const notifications = useSelector(selectAllNotifications);
	const numUnreadNotifications = notifications.filter(n => !n.read).length;

	const fetchNewNotifications = () => {
		dispatch(fetchNotifications());
	};

	let unreadNotificationsBadge;

	if (numUnreadNotifications > 0) {
		unreadNotificationsBadge = (
			<span className={'badge'}>{numUnreadNotifications}</span>
		);
	}

	return (
		<NavBarContainer>
			<NavItemsList>
				<NavItem>
					<Link to="/">Home</Link>
				</NavItem>
				<NavItem>
					<Link to="/posts">Posts</Link>
				</NavItem>
				<NavItem>
					<Link to="/users">Users</Link>
				</NavItem>
				<NavItem>
					<Link to="/about">About</Link>
				</NavItem>
			</NavItemsList>
			<NotificationsContainer>
				<NavItem>
					<Link to="/notifications">
						Notifications {unreadNotificationsBadge}{' '}
					</Link>
				</NavItem>
				<NotificationsButton onClick={fetchNewNotifications}>
					Refresh Notifications
				</NotificationsButton>
			</NotificationsContainer>
		</NavBarContainer>
	);
};

export default Navbar;
