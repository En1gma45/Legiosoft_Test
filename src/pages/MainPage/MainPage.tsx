import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import DataList from '../../components/DataList/DataList';
import ExportButton from '../../components/ExportButton/ExportButton';
import ImportButton from '../../components/ImportButton/ImportButton';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { deleteUserData, editUserData, fetchMocks } from '../../redux/reducer/TransactionReducer';
import { ITransaction } from '../../types/ITransaction';
import "./MainPage.scss"


const MainPage: React.FC = () => {

    const { transactions } = useTypedSelector(state => state.transactions)
    const [sortedData, setSortedData] = useState<Array<ITransaction>>([]);
    const statusInput = useRef<HTMLSelectElement>(null)
    const typeInput = useRef<HTMLSelectElement>(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMocks())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const editHandler = (id: number, status: string) => {
        dispatch(editUserData(id, status))
    }

    const deleteHandler = (id: number) => {
        dispatch(deleteUserData(id))
    }

    const handleSort = (e: any, sortBy: string) => {
        switch (sortBy) {
            case "Status":
                e.target.value === "All statuses" ? setSortedData([])
                    :
                    setSortedData(transactions.filter(sortItem => sortItem.Status === e.target.value))
                if (typeInput && typeInput.current) typeInput.current.options.selectedIndex = 0;
                break;

            case "Type":
                e.target.value === "All types" ? setSortedData([])
                    :
                    setSortedData(transactions.filter(sortItem => sortItem.Type === e.target.value))
                if (statusInput && statusInput.current) statusInput.current.options.selectedIndex = 0;
                break;

            default:
                break;
        }
    }

    
    return (
        <div className="main__container">
            <div className="main__sidebar">
                <p>Transactions</p>
            </div>
            <div className="main__data">
                <div className="main__filters">
                    <div className="main__select">
                        <Form.Select ref={statusInput} style={{ width: "10rem" }} onChange={(e) => handleSort(e, "Status")}>
                            <option value="All statuses">All statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Completed">Canceled</option>
                        </Form.Select>
                    </div>
                    <div className="main__select">
                        <Form.Select ref={typeInput} style={{ width: "10rem" }} onChange={(e) => handleSort(e, "Type")}>
                            <option value="All types">All types</option>
                            <option value="Refill">Refill</option>
                            <option value="Withdrawal">Withdrawal</option>
                        </Form.Select>
                    </div>
                    <ImportButton />
                    <ExportButton data={transactions} />
                </div>
                <div className="main__table">
                    <DataList data={sortedData.length !== 0 ? sortedData : transactions} editHandler={editHandler} deleteHandler={deleteHandler} />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
