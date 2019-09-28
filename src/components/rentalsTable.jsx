import React, { Component } from 'react';
import Table from './shared/table';
import FontAwesome from 'react-fontawesome';

class RentalsTable extends Component {

    columns = [
        { path: 'dateOut', label: 'Rent Date' },
        { path: 'customer.name', label: 'Customer' },
        { path: 'customer.email', label: 'Email' },
        { path: 'movie.title', label: 'Movie Title' },
        {
            key: 'edit',
            content: rental => {
                return (<div
                    style={{ cursor: 'pointer', color: '#45459a', padding: '2px 10px' }}
                    onClick={() => this.props.showDetails(rental)}>
                    <FontAwesome name="film" size="2x" />
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

export default RentalsTable;