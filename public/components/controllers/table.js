var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function renderTable(arrayTable, currentPage, recordsPerPage) {
    return __awaiter(this, void 0, void 0, function* () {
        //start and end index
        const startIndex = (currentPage - 1) * recordsPerPage + 1;
        const endIndex = Math.min(startIndex + recordsPerPage - 1, arrayTable.length - 1);
        //actual page
        const pageData = [arrayTable[0], ...arrayTable.slice(startIndex, endIndex - 1)];
        return `
        <table class="table table-stripped">
            <thead>
                ${arrayTable[0].map(value => {
            return `
                        <th scope="col">${value}</th>
                    `;
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
    });
}
//Pagination controlls
export function pagination(totalRecords, currentPage, recordsPerPage) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    let controls = '<div class="pagination">';
    for (let i = 1; i <= totalPages; i++) {
        controls += `
            <button class="pagination-button" data-page="${i}">${i}</button>
        `;
    }
    controls += '</div>';
    return controls;
}
