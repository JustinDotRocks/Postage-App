import { string } from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

const PostsList = () => {
    const posts = useSelector(state => state.posts)

    // Makes the newest post appear at the top of the list.
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.user}/>
            <TimeAgo timestamp={post.date} />
            <p>{post.content.substring(0, 100)}</p>
            <Link to={`/posts/${post.id}`}>View Post</Link>
            <ReactionButtons post={post} />
        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
};

export default PostsList;