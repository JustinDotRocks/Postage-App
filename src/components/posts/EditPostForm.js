import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { postUpdated } from './postsSlice';

const EditPostForm = ( { match } ) => {

    const { postId } = match.params

    const post = useSelector(state => state.posts.find(post => post.id === postId))

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()
    
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostclicked = () => {
        if (title && content) {
            dispatch(postUpdated({ id: postId, title, content }))
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label>Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" placeholder="What's on your mind?" value={title} onChange={onTitleChanged} />
                <label>Content:</label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
            </form>
            <button type="button" onClick={onSavePostclicked}>
                Save Post
            </button>
        </section>
    )

}

EditPostForm.propTypes = {
    match: PropTypes.string
}

export default EditPostForm;