import { ITransaction } from "../types/ITransaction";
import csv from "csvtojson"

export const csvParser = async (csvString: string) => {
    const response: Array<ITransaction> = await csv({
        output: "json",
    }).fromString(csvString)

    return response;
} 