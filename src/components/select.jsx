import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ data, label, value, selectChangeHandler, id, name, error }) => {
    return (
        <div className="form-group">
            <label htmlFor={label}>{label}</label>
            <select onChange={(e) => selectChangeHandler(e.target.value)}
                id={label}
                className="form-control"
                value={value}>
                <option value=""></option>
                {data.map(item => {
                    return <option value={item[id]} key={item[id]}>{item[name]}</option>
                })}
            </select>
            {error.message && <div className="alert alert-danger">{error.message}</div>}
        </div>
    );
}

Select.propTypes = {
    data: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    selectChangeHandler: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Select;