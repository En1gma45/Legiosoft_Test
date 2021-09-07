import { ITransaction } from './../../types/ITransaction';
import { setMocksData, setMocksError, setUserData, setUserDataError } from './../reducer/TransactionReducer';
import { call, put, takeEvery } from "redux-saga/effects"
import { ActionTypes } from "../types/Transaction"
import { fetchData, fetchMocks } from '../actions/dataActions';


function* fetchMocksWorker() {
    try {
        const arr: ITransaction[] = yield call(fetchMocks)
        yield put(setMocksData(arr))
    } catch (e) {
        yield put(setMocksError(e))
    }

}

function* fetchUserDataWorker(action: any) {
    try {
        const arr: ITransaction[] = yield fetchData(action.file)
        yield put(setUserData(arr))
    } catch (error) {
        yield put(setUserDataError(error))
    }
}


export function* dataWatcher() {
    yield takeEvery(ActionTypes.FETCH_MOCKS, fetchMocksWorker)
    yield takeEvery(ActionTypes.FETCH_DATA, fetchUserDataWorker)
}