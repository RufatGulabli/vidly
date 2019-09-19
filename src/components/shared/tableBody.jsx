import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class TableBody extends Component {

    renderCell = (movie, column) => {
        if (column.content) {
            return column.content(movie);
        }
        return _.get(movie, column.path);
    }

    render() {
        const { data, columns } = this.props;
        return (
            <tbody>
                {data.map(movie => (
                    <tr key={movie._id}>
                        {columns.map(col => {
                            return <td key={col.path || col.key}>{this.renderCell(movie, col)}</td>
                        })}
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableBody;