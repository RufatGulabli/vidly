import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import CustomersTable from './customersTable';
import customerService from '../services/customerService';
import SearchBox from './searchbox';
import Paginator from "./shared/paginator";
import { pagination } from '../utils/pagination';
import { toast } from 'react-toastify';
class Customers extends Component {

    state = {
        customers: [],
        sortColumn: { path: 'name', order: 'asc' },
        currentPage: 1,
        pageSize: 8,
        searchQuery: '',
        showModal: false,
        selectedCustomer: {}
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

    setSelectedCustomer = customerId => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
        const selectedCustomer = this.state.customers.filter(cust => cust._id === customerId)[0];
        this.setState({ selectedCustomer });
    }

    deleteCustomer = async () => {
        try {
            await customerService.deleteCustomer(this.state.selectedCustomer._id);
            const customers = this.state.customers.filter(cust => cust._id !== this.state.selectedCustomer._id);
            this.setState({ customers });
            this.toggleModal();
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

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    render() {
        const { sortColumn, searchQuery, currentPage, pageSize, showModal, selectedCustomer } = this.state;
        const { data: customers, totalCount } = this.getPagedData();
        const style = {
            boxShadow: '0 2px 9px #ccc',
            padding: '20px',
            borderRadius: '6px',
            backgroundColor: 'white'
        }
        return (
            <div className="col mt-3 px-5" style={style}>
                <Modal centered={true} toggle={this.toggleModal} size='sm' isOpen={showModal} >
                    <ModalBody>
                        Are you sure to delete {selectedCustomer.name}?
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.deleteCustomer} className="btn btn-success btn-sm w-50">Delete</button>
                        <button onClick={this.toggleModal} className="btn btn-danger btn-sm w-50">Cancel</button>
                    </ModalFooter>
                </Modal>
                <SearchBox value={searchQuery} onSearch={this.onSearch} placeholder="Search Customer..." />
                <CustomersTable
                    sortColumn={sortColumn}
                    data={customers}
                    onSort={this.sortHandler}
                    onDelete={this.setSelectedCustomer}
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


