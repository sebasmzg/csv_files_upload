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
        const start = (currentPage - 1) * recordsPerPage + 1;
        const end = start + recordsPerPage;
        const paginatedData = arrayTable.slice(start, end);
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
    });
}
