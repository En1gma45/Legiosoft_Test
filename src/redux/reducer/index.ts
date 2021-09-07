import { combineReducers } from "redux";
import { transactionReducer } from "./TransactionReducer";


export const rootReducer = combineReducers({
    transactions: transactionReducer,
})

export type RootState = ReturnType<typeof rootReducer>