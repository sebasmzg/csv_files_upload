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
        const endIndex = startIndex + recordsPerPage;
        const paginatedData = arrayTable.slice(startIndex, endIndex);
        const columnNames = arrayTable[0] ? Object.keys(arrayTable[0]) : [];
        return `
        <table class="table table-stripped">
            <thead>
                <tr>
                    ${columnNames.map(columnName => {
            `<th scope="col">${columnName}</th>`;
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
    });
}
