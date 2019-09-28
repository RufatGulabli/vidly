import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const Rent = (props) => {
    return (
        <div style={{ cursor: 'pointer' }}>
            <FontAwesome style={{ cursor: 'pointer' }} name="film" size="2x" onClick={props.onRent} />
        </div>)
}

Rent.propTypes = {
    like: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Rent;