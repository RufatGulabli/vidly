import React from 'react';
import FontAwesome from 'react-fontawesome';

const Input = ({ name, label, error, inputGroup, iconName, ...rest }) => {

    let input =
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input {...rest} name={name} className="form-control" />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>

    if (inputGroup) {
        input =
            <div className="mb-3">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            <FontAwesome name={iconName} />
                        </span>
                    </div>
                    <input {...rest} name={name} className="form-control" />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>


    }
    return (input);
}

export default Input;