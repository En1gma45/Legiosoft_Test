import { deleteData, editData } from '../actions/dataActions';
import { ITransaction } from './../../types/ITransaction';
import { TransactionState, IAction, ActionTypes } from "../types/Transaction"

const initState: TransactionState = {
    transactions: [],
    error: null,
}

export const transactionReducer = (state = initState, action: IAction): TransactionState => {
    switch (action.type) {
        case ActionTypes.SET_MOCKS:
            return { transactions: action.payload, error: null }

        case ActionTypes.SET_MOCKS_ERROR:
            return { transactions: [], error: action.payload }

        case ActionTypes.SET_DATA: {
            return { transactions: action.payload, error: null }
        }

        case ActionTypes.SET_DATA_ERROR: {
            return { transactions: [], error: action.payload }
        }

        case ActionTypes.EDIT_DATA: {
            const newState = editData(state.transactions, action.id, action.status)
            return { transactions: newState, error: null }
        }

        case ActionTypes.DELETE_DATA: {
            const newState = deleteData(state.transactions, action.id)
            return { transactions: newState, error: null }
        }

        default:
            return state
    }
}

export const setMocksData = (payload: ITransaction[]) => ({ type: ActionTypes.SET_MOCKS, payload })
export const fetchMocks = () => ({ type: ActionTypes.FETCH_MOCKS })
export const setMocksError = (payload: any) => ({ type: ActionTypes.SET_MOCKS_ERROR, payload})
export const setUserData = (payload: ITransaction[]) => ({ type: ActionTypes.SET_DATA, payload })
export const fetchUserData = (file: File) => ({ type: ActionTypes.FETCH_DATA, file: file})
export const setUserDataError = (payload: any) => ({ type: ActionTypes.SET_DATA_ERROR, payload})

export const editUserData = (id: number, status: string) => ({type: ActionTypes.EDIT_DATA, id: id, status: status})
export const deleteUserData = (id: number) => ({type: ActionTypes.DELETE_DATA, id: id})