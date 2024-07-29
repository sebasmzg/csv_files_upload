import { DataRow,ColumnName } from "../models/models.js";

export async function convertCsv(data: DataRow[],columnNames:ColumnName):Promise<string>{
    const csvRows=[];

    /* add headers */
    csvRows.push(columnNames.join(','));

    /* add rows */
    data.forEach(row=>{
        const values = columnNames.map(column=>row[column] || '');
        csvRows.push(values.join(','));
    })

    return csvRows.join('\n')

}

export async function downloadCSV(csvContent:string,fileName:string){
    /* Blob */
    const blob = new Blob([csvContent], {type:'text/csv;charset=utf-8;'});
    /* link */
    const link = document.createElement('a');
    /* URL href */
    const url = URL.createObjectURL(blob);
    link.setAttribute('href',url);
    link.setAttribute('download',fileName)
    /* add link to nav */
    document.body.appendChild(link);
    /* trigger */
    link.click();
    /* remove link */
    document.body.removeChild(link);
}