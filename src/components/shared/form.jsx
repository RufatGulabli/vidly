import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from '../input';
import Select from '../select';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        if (!error) {
            return null;
        }
        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }


    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit();
    }

    changeHandler = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const data = { ...this.state.data };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        data[input.name] = input.value;
        this.setState({ data, errors });
    }

    renderButton = (btnType, label) => {
        return <button disabled={this.validate()} type="submit" className={btnType}>{label}</button>
    }

    renderInput = (name, label, type = 'text', inputGroup = false, iconName) => {
        const { data, errors } = this.state;
        return (
            <Input
                type={type}
                name={name}
                label={label}
                value={data[name]}
                onChange={this.changeHandler}
                inputGroup={inputGroup}
                iconName={iconName}
                error={errors[name]} />
        );
    }

    renderSelect = (data, label, value, selectChangeHandler, id, name, error) => {
        return (
            <Select data={data}
                label={label}
                value={value}
                selectChangeHandler={selectChangeHandler}
                id={id}
                name={name}
                error={error}
            />);
    }

}

export default Form;