import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Paginator = ({ pageSize, count, currentPage, onPageChange }) => {
    const pagesCount = count / pageSize;
    if (pagesCount <= 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => {
                    return (
                        <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'} >
                            <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

Paginator.propTypes = {
    pageSize: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Paginator;