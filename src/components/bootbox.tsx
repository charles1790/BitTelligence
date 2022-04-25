import { FC, useState} from 'react';
import { Modal, Button, Form, Dropdown, DropdownButton, Alert, AlertProps } from 'react-bootstrap';

const BootBox : FC<any> = (props) => {


    return(<>
    <Modal show={props.show} fullscreen="sm-down">

        <Modal.Header closeButton onClick={props.onClose}>
            <Modal.Title>Confirm set flag</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {props.message}
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={props.onCancel}>Cancel</Button>
            <Button variant="primary" onClick={props.onSuccess}>Yes</Button>
        </Modal.Footer>

        </Modal>
</>);
}

export default BootBox;
