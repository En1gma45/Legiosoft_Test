import { ITransaction } from '../../types/ITransaction';
import { csvParser } from "../../helpers/csvParser"


export const fetchMocks = async () => {
    const response = await fetch("mocks.csv")
    const data = await csvParser(await response.text())
    return data
}

export const fetchData = async (file: File) => {
    const response = await csvParser(await file.text())
    return response
}

export const editData = (data: ITransaction[], id: number, status: string) => {
    const index = data.findIndex((el) => el.TransactionId === id)
    data[index].Status = status
    return data
}

export const deleteData = (data: ITransaction[], id: number) => {
    const index = data.findIndex((el) => el.TransactionId === id)
    data.splice(index, 1)
    return data
}