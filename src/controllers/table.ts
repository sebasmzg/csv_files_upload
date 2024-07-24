export async function renderTable(arrayTable: string[][],currentPage:number,recordsPerPage:number):Promise<string>{
    //start and end index
    const startIndex = (currentPage - 1) * recordsPerPage + 1;
    const endIndex = Math.min(startIndex + recordsPerPage - 1,arrayTable.length -1);

    //actual page
    const pageData = [arrayTable[0],...arrayTable.slice(startIndex, endIndex -1)];

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
                ${arrayTable.slice(1).map(value => `
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


//Pagination controlls

export function pagination(totalRecords: number, currentPage:number, recordsPerPage:number): string {
    const totalPages = Math.ceil(totalRecords / recordsPerPage)
    let controls = '<div class="pagination">';

    for(let i =1;i<=totalPages;i++){
        controls += `
            <button class="pagination-button" data-page="${i}">${i}</button>
        `
    }
    controls += '</div>';
    return controls;
}