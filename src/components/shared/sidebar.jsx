import React from 'react';
import PropTypes from 'prop-types';

const SideBar = ({ categories, onCategorySelect, selectedCategory, text, id }) => {
    return (
        <div className="list-group pr-3">
            <button
                className={
                    selectedCategory === '0'
                        ? 'list-group-item list-group-item-action active'
                        : 'list-group-item list-group-item-action'
                }
                key="0"
                onClick={() => onCategorySelect('0')}>
                All Genres
            </button>
            {categories.map(cat => {
                return (
                    <button key={cat[id]}
                        className={selectedCategory === cat[id] ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}
                        onClick={() => onCategorySelect(cat[id])}>
                        {cat[text]}
                    </button>
                );
            })}
        </div>
    );
}

SideBar.defaultProps = {
    text: 'name',
    id: '_id'
}

SideBar.propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    onCategorySelect: PropTypes.func.isRequired
}

export default SideBar;