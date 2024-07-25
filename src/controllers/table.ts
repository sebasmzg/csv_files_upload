import { DataRow,DataTable,ColumnName } from "../models/models";

export async function renderTable(arrayTable: DataTable,currentPage:number,recordsPerPage:number):Promise<string>{
    //start and end index
    const startIndex = (currentPage - 1) * recordsPerPage + 1;
    const endIndex = startIndex + recordsPerPage;
    const paginatedData = arrayTable.slice(startIndex, endIndex)
    const columnNames = arrayTable[0] ? Object.keys(arrayTable[0]) : [];

    return `
        <table class="table table-stripped">
            <thead>
                <tr>
                    ${columnNames.map(columnName=>{
                        `<th scope="col">${columnName}</th>`
                    }).join('')}
                </tr>
            <thead>
            <tbody>
                ${paginatedData.map(row => `
                    <tr>
                        ${columnNames.map(columnName => `
                            <td>${row[columnName] || ''}</td>
                        `).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

