import React from 'react';
import { Spinner } from 'reactstrap';

const MySpinner = () => {
    return (
        <div className="d-flex justify-content-center my-4 py-4">
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="success" />
        </div>
    );
}

export default MySpinner;