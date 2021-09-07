import { ITransaction } from "../../types/ITransaction";

export interface TransactionState {
    transactions: Array<ITransaction>;
    error: null | string | Error;
}

export enum ActionTypes {
    FETCH_MOCKS = "FETCH_MOCKS",
    SET_MOCKS = "SET_MOCKS",
    SET_MOCKS_ERROR = "SET_MOCKS_ERROR",
    FETCH_DATA = "FETCH_DATA",
    SET_DATA = "SET_DATA",
    SET_DATA_ERROR = "SET_DATA_ERROR",
    EDIT_DATA = "EDIT_DATA",
    DELETE_DATA = "DELETE_DATA",
}

interface SetMocksData {
    type: ActionTypes.SET_MOCKS
    payload: ITransaction[]
}

interface SetMocksError {
    type: ActionTypes.SET_MOCKS_ERROR
    payload: string | Error 
}

interface SetData {
    type: ActionTypes.SET_DATA
    payload: ITransaction[]
}

interface SetDataError {
    type: ActionTypes.SET_DATA_ERROR
    payload: string | Error
}

interface EditData {
    type: ActionTypes.EDIT_DATA;
    id: number;
    status: string;
}

interface DeleteData {
    type: ActionTypes.DELETE_DATA
    id: number;
}

export type IAction = SetMocksData | SetMocksError | SetData | SetDataError | EditData | DeleteData;
