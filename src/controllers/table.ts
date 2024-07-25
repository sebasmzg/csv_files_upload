export async function renderTable(arrayTable: string[][],currentPage:number,recordsPerPage:number):Promise<string>{
    //start and end index
    const start = (currentPage - 1) * recordsPerPage + 1;
    const end = start + recordsPerPage;
    const paginatedData = arrayTable.slice(start, end)

    return `
        <table class="table table-stripped">
            <thead>
                ${arrayTable[0].map(value =>{
                    return `
                        <th scope="col">${value}</th>
                    `
                }).join('')}
            <thead>
            <tbody>
                ${paginatedData.slice(1).map(value => `
                    <tr>
                        ${value.map(sub_val => `
                            <td>${sub_val}</td>
                        `).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

