import { DataRow,DataTable,ColumnName } from "../models/models.js";

export async function convertCsv(data: DataRow[],columnNames:ColumnName):Promise<string>{
    const csvRows=[];

    /* add headers */
    csvRows.push(columnNames.join(','));

    /* add rows */
    data.forEach(row=>{
        const values = columnNames.map(column=>row[column] || '');
        csvRows.push(values.join(''));
    })

    return csvRows.join('\n')

}

