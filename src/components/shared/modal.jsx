import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const BootstrapModal = ({ show, toggle, label, className, children }) => {

    return (
        <div>
            <Modal centered={true} size="md" isOpen={show} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{label}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default BootstrapModal;