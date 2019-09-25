import React from 'react';

const SearchBox = ({ value, onSearch, ...rest }) => {
    return (
        <div className="form-group">
            <input
                onChange={(e) => onSearch(e.target.value)}
                value={value}
                type="text"
                className="form-control"
                {...rest}
            />
        </div>
    );
}

export default SearchBox;