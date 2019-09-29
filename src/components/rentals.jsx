import React, { Component } from 'react';
import _ from 'lodash';
import SearchBox from './searchbox';
import Paginator from "./shared/paginator";
import { pagination } from '../utils/pagination';
import rentalService from '../services/rentalService';
import RentalsTable from './rentalsTable';
import BootstrapModal from './shared/modal';
import MySpinner from './shared/spinner';
import moment from 'moment';

class Rentals extends Component {
    state = {
        rentals: [],
        sortColumn: { path: 'dateOut', order: 'desc' },
        currentPage: 1,
        pageSize: 8,
        searchQuery: '',
        showModal: false,
        loading: false,
        selectedRental: {
            movie: {
                title: '',
                numberInStock: 0,
                dailyRentalRate: 0,
                imageUrl: ''
            },
            dateOut: new Date().now,
            dateReturned: ''
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const { data } = await rentalService.getRentals();
            const rentals = data.map(rent => {
                const cloneOfRent = _.cloneDeep(rent);
                cloneOfRent.dateOut = moment(cloneOfRent.dateOut).local().format('DD.MM.YYYY HH:mm');
                cloneOfRent.movie.publishDate = moment(cloneOfRent.movie.publishDate).local().format('DD.MM.YYYY HH:mm');
                cloneOfRent.dateReturned = moment(cloneOfRent.dateReturned).local().format('DD.MM.YYYY');
                return cloneOfRent;
            });
            this.setState({ rentals, loading: false });
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

        const style = {
            boxShadow: '0 2px 9px #ccc',
            padding: '20px',
            borderRadius: '6px',
            backgroundColor: 'white'
        }

        return (
            <div className="col mt-3 px-5" style={style}>
                <SearchBox value={searchQuery} onSearch={this.onSearch} placeholder="Search Rental by Movie..." />
                {this.state.loading ? <MySpinner /> :
                    <div>
                        <RentalsTable
                            sortColumn={sortColumn}
                            data={rentals}
                            onSort={this.sortHandler}
                            showDetails={this.showRentalDetails}
                        />
                        <Paginator
                            currentPage={currentPage}
                            onPageChange={this.changePageHandler}
                            count={totalCount}
                            pageSize={pageSize} />
                    </div>
                }
                <BootstrapModal show={showModal} toggle={this.closeModal} label={selectedRental.movie.title} >
                    <div className="row">
                        <div className="col-4">
                            <img src={selectedRental.movie.imageUrl} alt="" style={{ width: '150px', height: '200px' }} />
                        </div>
                        <div className="col-8">
                            <div>
                                <label className="col-5 text-right p-0">Title: </label>
                                <span className="col-7 text-left">{selectedRental.movie.title}</span>
                            </div>
                            <div>
                                <label className="col-5 text-right p-0">Rate: </label>
                                <span className="col-7 text-left">{selectedRental.movie.dailyRentalRate}</span>
                            </div>
                            <div>
                                <label className="col-5 text-right p-0">Publish Date:  </label>
                                <span className="col-7 text-left">{selectedRental.movie.publishDate}</span>
                            </div>
                            <div>
                                <label className="col-5 text-right p-0">Date Out: </label>
                                <span className="col-7 text-left">{selectedRental.dateOut}</span>
                            </div>
                            <div>
                                <label className="col-5 text-right p-0">Return Date: </label>
                                <span className="col-7 text-left">{selectedRental.dateReturned}</span>
                            </div>
                        </div>
                    </div>
                </BootstrapModal>
            </div>

        );
    }
}

export default Rentals;