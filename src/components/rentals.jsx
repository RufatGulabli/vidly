import React, { Component } from 'react';
import _ from 'lodash';
import SearchBox from './searchbox';
import Paginator from "./shared/paginator";
import { pagination } from '../utils/pagination';
import rentalService from '../services/rentalService';
import RentalsTable from './rentalsTable';
import BootstrapModal from './shared/modal';

class Rentals extends Component {
    state = {
        rentals: [],
        sortColumn: { path: 'dateOut', order: 'asc' },
        currentPage: 1,
        pageSize: 6,
        searchQuery: '',
        showModal: false,
        selectedRental: {
            movie: {
                title: '',
                numberInStock: 0,
                dailyRentalRate: 0,
                imageUrl: ''
            },
            dateOut: new Date().now
        }
    }

    async componentDidMount() {
        try {
            const { data: rentals } = await rentalService.getRentals();
            this.setState({ rentals });
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
            rentals
        } = this.state;
        let pagedData = rentals;
        if (searchQuery) {
            pagedData = rentals.filter(rental => {
                return rental.movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            });
        }
        const sortedRentals = _.orderBy(pagedData, [sortColumn.path], [sortColumn.order]);
        pagedData = pagination(sortedRentals, currentPage, pageSize);
        return { totalCount: sortedRentals.length, data: pagedData };
    }

    onSearch = value => {
        this.setState({ searchQuery: value, currentPage: 1 });
    }

    deleteCustomer = async rentalId => {
        // try {
        //     await rentalService.deleteRental(rentalId);
        //     const customers = this.state.customers.filter(cust => cust._id !== rentalId);
        //     this.setState({ customers });
        //     toast.success('Customer deleted successfully');
        // } catch (exc) {
        //     if (exc.response && exc.response.data) {
        //         toast.error(exc.response.data.message);
        //     }
        // }
    }

    changePageHandler = page => {
        this.setState({ currentPage: page });
    }

    showRentalDetails = rental => {
        this.setState({ selectedRental: rental });
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    closeModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    render() {
        const { sortColumn, searchQuery, currentPage, pageSize, showModal, selectedRental } = this.state;

        const { data: rentals, totalCount } = this.getPagedData();
        return (
            <div className="col">
                <BootstrapModal show={showModal} toggle={this.closeModal} label={selectedRental.movie.title} >
                    <div className="row">
                        <div className="col-4">
                            <img src={selectedRental.movie.imageUrl} alt="" style={{ width: '150px', height: '200px' }} />
                        </div>
                        <div className="col-8">
                            <div>
                                <label className="col-4 text-right p-0">Title : </label>
                                <span className="col-8 text-left">{selectedRental.movie.title}</span>
                            </div>
                            <div>
                                <label className="col-4 text-right p-0">Stock : </label>
                                <span className="col-8 text-left">{selectedRental.movie.numberInStock}</span>
                            </div>
                            <div>
                                <label className="col-4 text-right p-0">Rate : </label>
                                <span className="col-8 text-left">{selectedRental.movie.dailyRentalRate}</span>
                            </div>
                            <div>
                                <label className="col-4 text-right p-0">Date Out : </label>
                                <span className="col-8 text-left">{selectedRental.dateOut}</span>
                            </div>
                        </div>
                    </div>
                </BootstrapModal>
                <SearchBox value={searchQuery} onSearch={this.onSearch} placeholder="Search Rental by Movie..." />
                <RentalsTable
                    sortColumn={sortColumn}
                    data={rentals}
                    onSort={this.sortHandler}
                    onDelete={this.deleteCustomer}
                    showDetails={this.showRentalDetails}
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

export default Rentals;