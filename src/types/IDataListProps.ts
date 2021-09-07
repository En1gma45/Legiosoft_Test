import { ITransaction } from "./ITransaction";

export interface IDataListProps {
    data: ITransaction[];
    editHandler: (id: number, status: string)=> void;
    deleteHandler: (id: number)=> void;
}