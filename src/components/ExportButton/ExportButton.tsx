import React from 'react';
import { Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { IExportProps } from '../../types/IExportProps';
import { ITransaction } from '../../types/ITransaction';


const ExportButton: React.FC<IExportProps> = ({ data }) => {

    const handleExport = (json: Array<ITransaction>) => {
        const headers = Object.keys(json[0])
        const replacer = (key: string, value: string) => value === null ? '' : value
        const csv = json.map(row => {
            return headers.map(fieldName => {
                return JSON.stringify(row[fieldName as keyof ITransaction], replacer)
            }).join(',')
        })
        csv.unshift(headers.join(','))
        const result = csv.join('\r\n');
        saveAs(new File([result], "data.csv"))
    }

    return (
        <>
            <Button style={{ width: "10rem" }} onClick={() => handleExport(data)}>Export</Button>
        </>
    );
}

export default ExportButton;
