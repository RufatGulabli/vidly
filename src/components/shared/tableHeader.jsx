import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class TableHeader extends Component {

    raiseSort = path => {
        if (!path) {
            return;
        }
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path) {
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn.order = 'asc';
            sortColumn.path = path;
        }
        this.props.onSort(sortColumn);
    }

    renderSortIcon = (column) => {
        const { sortColumn } = this.props;
        if (sortColumn.path !== column.path) {
            return null;
        }
        if (sortColumn.order === 'asc') {
            return (<span className="ml-1" ><FontAwesome name="sort-up" /></span>)
        }
        return (<span className="ml-1"><FontAwesome name="sort-down" /></span>)
    }

    render() {
        return (
            <thead>
                <tr>
                    {this.props.columns.map(col => {
                        return (
                            <th style={{ cursor: 'pointer' }} key={col.path || col.key} onClick={() => this.raiseSort(col.path)}>
                                {col.label}{this.renderSortIcon(col)}
                            </th>);
                    })}
                </tr>
            </thead>
        )
    }
}

export default TableHeader;