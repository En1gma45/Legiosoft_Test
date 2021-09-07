import React, { useState } from 'react';
import { Table, Button, Pagination, Modal, Form } from 'react-bootstrap';
import { IDataListProps } from '../../types/IDataListProps';
import { ITransaction } from '../../types/ITransaction';


const DataList: React.FC<IDataListProps> = ({ data, editHandler, deleteHandler }) => {

    const [show, setShow] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [size] = useState<number>(10);

    const [id, setId] = useState<number>();
    const [status, setStatus] = useState<string>();

    const handleClose = (id?: number, status?: string) => {
        setShow(false);
        if (id && status) editHandler(id, status);
    }
    const handleShow = (id: number) => {
        setShow(true);
        setId(id);
    }

    const handleDelete = (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        const isConfirm = confirm("Are you sure?")
        if (isConfirm) {
            deleteHandler(id)
        }
    }

    const renderData = (dataArray: ITransaction[]) => {
        if (dataArray.length === 0) return []
        const elements: any[] = []
        for (let index = (page - 1) * size; index < page * size; index++) {
            if (dataArray[index] === undefined) break;
            elements.push(
                <tr key={dataArray[index].TransactionId}>
                    <td>{dataArray[index].TransactionId}</td>
                    <td>{dataArray[index].Status}</td>
                    <td>{dataArray[index].Type}</td>
                    <td>{dataArray[index].ClientName}</td>
                    <td>{dataArray[index].Amount}</td>
                    <td><Button style={{ marginRight: "1rem" }} onClick={() => handleShow(dataArray[index].TransactionId)}>Edit</Button><Button onClick={() => handleDelete(dataArray[index].TransactionId)}>Delete</Button></td>
                </tr>
            )
        }
        return elements
    }

    const renderPaginationButtons = () => {
        let items = [];
        for (let number = 1; number <= Math.ceil(data.length / size); number++) {
            items.push(
                <Pagination.Item key={number} value={number} active={number === page} onClick={() => setPage(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select style={{ width: "10rem" }} onChange={(e) => setStatus((e.target as HTMLSelectElement).value)}>
                        <option value="All statuses">All statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={id && status ? () => handleClose(id, status) : undefined}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Client name</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderData(data)}
                </tbody>
            </Table>
            {renderPaginationButtons().length > 1 &&
                <Pagination style={{ margin: "0 auto", display: "flex", justifyContent: "space-between", width: "50%" }}>{renderPaginationButtons()}</Pagination>
            }
        </>
    );
}

export default DataList;
