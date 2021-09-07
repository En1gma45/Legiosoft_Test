import { all } from "@redux-saga/core/effects";
import { dataWatcher } from "./dataSaga";

export function* rootWatcher () {
    yield all([dataWatcher()])
}