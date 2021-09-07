import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IInputProps } from '../../types/IInputProps';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../redux/reducer/TransactionReducer';


const ImportButton: React.FC<IInputProps> = () => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [file, setFile] = useState<File>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleImport = async (data: File) => {
        dispatch(fetchUserData(data))
        handleClose()
    }

    return (
        <>
            <Button style={{width:"10rem"}} variant="primary" onClick={handleShow}>
                Import
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose your csv file</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" onChange={e => setFile(e.target.files![0])} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleImport(file as File)}>
                        Import
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ImportButton;
