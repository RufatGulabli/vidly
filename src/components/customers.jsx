import React, { Component } from 'react';
import CustomersTable from './customersTable';
import customerService from '../services/customerService';
import SearchBox from './searchbox';
import Paginator from "./shared/paginator";
import { pagination } from '../utils/pagination';
import _ from 'lodash';
import { toast } from 'react-toastify';

class Customers extends Component {

    state = {
        customers: [],
        sortColumn: { path: 'name', order: 'asc' },
        currentPage: 1,
        pageSize: 4,
        searchQuery: ''
    }

    async componentDidMount() {
        try {
            const { data: customers } = await customerService.getCustomers();
            this.setState({ customers });
        } catch (exc) { }
    }

    sortHandler = sortColumn => {
        this.setState({ sortColumn });
    }

    getPagedData = () => {
        const {
            currentPage,
            pageSize,
            sortColumn,
            searchQuery,
            customers
        } = this.state;
        let pagedData = customers;
        if (searchQuery) {
            pagedData = customers.filter(customer => {
                return customer.name.toLowerCase().includes(searchQuery.toLowerCase())
            });
        }
        const sortedCustomers = _.orderBy(pagedData, [sortColumn.path], [sortColumn.order]);
        pagedData = pagination(sortedCustomers, currentPage, pageSize);
        return { totalCount: sortedCustomers.length, data: pagedData };
    }

    onSearch = value => {
        this.setState({ searchQuery: value, currentPage: 1 });
    }

    deleteCustomer = async customerId => {
        try {
            await customerService.deleteCustomer(customerId);
            const customers = this.state.customers.filter(cust => cust._id !== customerId);
            this.setState({ customers });
            toast.success('Customer deleted successfully');
        } catch (exc) {
            if (exc.response && exc.response.data) {
                toast.error(exc.response.data.message);
            }
        }
    }

    changePageHandler = page => {
        this.setState({ currentPage: page });
    }

    render() {
        const { sortColumn, searchQuery, currentPage, pageSize } = this.state;
        const { data: customers, totalCount } = this.getPagedData();
        return (
            <div className="col">
                <SearchBox value={searchQuery} onSearch={this.onSearch} placeholder="Search Customer..." />
                <CustomersTable
                    sortColumn={sortColumn}
                    data={customers}
                    onSort={this.sortHandler}
                    onDelete={this.deleteCustomer}
                />
                <Paginator
                    currentPage={currentPage}
                    onPageChange={this.changePageHandler}
                    count={totalCount}
                    pageSize={pageSize} />
            </div>

        );
    }
}

export default Customers;


