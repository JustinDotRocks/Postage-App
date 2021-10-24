import React from 'react';
import styled from 'styled-components';

const HomePage = () => {
	return (
		<HomeContainer>
			<h2>Postage!</h2>
			<HomeParagraphContainer>
				<p>
					Create a title, choose the author, save your post, edit your post if
					need be.
				</p>
				<p>Don't forget to react to your favorite posts!</p>
				<p>Mock posts and notifications present.</p>
			</HomeParagraphContainer>
		</HomeContainer>
	);
};

export default HomePage;

const HomeContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	> h2 {
		font-size: 3em;
		margin-top: 3em;
	}
`;

const HomeParagraphContainer = styled.div`
	width: 60vw;
	height: auto;
	font-family: 'poppins';
	font-size: 1.75em;
	color: #0089aa;
	margin-top: 2em;
	display: flex;
	justify-content: center;

	> p {
		margin: 2em;
	}
`;
