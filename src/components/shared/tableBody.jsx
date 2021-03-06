import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {

    renderCell = (item, column) => {
        if (column.content) {
            return column.content(item);
        }
        return _.get(item, column.path);
    }

    render() {
        const { data, columns } = this.props;
        return (
            <tbody>
                {(data && data.length) ? data.map(item => (
                    <tr key={item._id}>
                        {columns.map(col => {
                            return <td key={col.path || col.key}>{this.renderCell(item, col)}</td>
                        })}
                    </tr>
                )) : null}
            </tbody>
        );
    }
}

export default TableBody;