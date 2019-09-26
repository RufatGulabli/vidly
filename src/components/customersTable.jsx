import React, { Component } from 'react';
import Table from './shared/table';
import FontAwesome from 'react-fontawesome';

class CustomersTable extends Component {

    columns = [
        { path: 'name', label: 'Customer' },
        { path: 'phone', label: 'Phone' },
        { path: 'email', label: 'Email' },
        {
            path: 'isGold',
            key: 'isGold',
            label: 'Gold Member',
            content: customer => customer.isGold ? 'Yes' : 'No'
        },
        {
            key: 'edit',
            content: customer => {
                return (<div
                    style={{ cursor: 'pointer', color: '#d84a4a', padding: '2px 10px' }}
                    onClick={() => this.props.onDelete(customer._id)}>
                    <FontAwesome name="trash" size="2x" />
                </div>)
            }
        },
    ];

    render() {
        const { data, sortColumn, onSort } = this.props;
        return (
            <div>
                <Table data={data} sortColumn={sortColumn} onSort={onSort} columns={this.columns} />
            </div>
        );
    }
}

export default CustomersTable;