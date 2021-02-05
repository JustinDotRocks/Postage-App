import React from 'react';
//import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons'

const SinglePostPage = ( { match } ) => {
    
    const { postId } = match.params

    const post = useSelector(state => 
        state.posts.find(post => post.id === postId)
    )

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <section>
            <article>
                <h2>{post.title}</h2>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date}/>
                <p>{post.content}</p>
                <Link to={`/editPost/${post.id}`} >
                    Edit Post
                </Link>
                <ReactionButtons post={post} />
            </article>
        </section>
    )
};

SinglePostPage.propTypes = {
    match: PropTypes.string
}

export default SinglePostPage;