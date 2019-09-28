import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const BootstrapModal = ({ show, toggle, label, className, children, size }) => {

    return (
        <div>
            <Modal centered={true} size={size} isOpen={show} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{label}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </Modal>
        </div>
    );
}

export default BootstrapModal;