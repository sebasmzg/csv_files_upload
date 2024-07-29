import { DataTable } from "../models/models";

export async function renderTable(arrayTable: DataTable,currentPage:number,recordsPerPage:number):Promise<string>{
    //start and end index
    const startIndex = (currentPage - 1) * recordsPerPage;
    const finalIndex = startIndex + recordsPerPage;
    const paginatedData = arrayTable.slice(startIndex, finalIndex)

    // Extract column names from the first row if available
    const columnNames = arrayTable.length > 0 ? Object.keys(arrayTable[0]) : [];
    // Render the table
    return `
        <table class="table table-stripped">
            <thead>
                ${columnNames.map(value => `
                    <th scope="col">${value}
                        <div>
                            <button class="sort-btn btn btn-outline-primary" data-column="${value}" data-order="asc">↑</button>
                            <button class="sort-btn btn btn-outline-primary" data-column="${value}" data-order="des">↓</button>
                        </div>
                    </th>
                    `).join('')}
            <thead>
            <tbody>
                ${paginatedData.map(row => `
                    <tr>
                        ${columnNames.map(columnName => `
                            <td>
                                ${row[columnName] || ''}
                            </td>
                        `).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

