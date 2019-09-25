import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const Like = (props) => {
    let classes = 'heart';
    if (!props.like) {
        classes += '-o';
    }
    return <FontAwesome style={{ cursor: 'pointer' }} name={classes} onClick={props.onLike} />;
}

Like.propTypes = {
    like: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Like;