var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FileController } from "./models/fileController.js";
import { renderTable } from "./controllers/table.js";
import { filterData } from "./controllers/filter.js";
import { downloadCSV, convertCsv } from "./controllers/downloadCsv.js";
import { sortColumns } from "./controllers/sort.js";
import { renderChart } from "./controllers/chart.js";
const csvForm = document.getElementById('csvForm');
const csvFile = document.getElementById('csvFile');
const displayArea = document.getElementById('displayArea');
const searchInput = document.getElementById('searchInput');
const downloadButton = document.getElementById('downloadCSV');
const recordsPerPage = 10;
let currentPage = 1;
let finalvalues = [];
let columnNames = [];
document.addEventListener('DOMContentLoaded', () => {
    csvForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        const csvReader = new FileReader();
        const input = csvFile.files[0];
        const fileName = input.name;
        const fileExtension = (_a = fileName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
        if (fileExtension !== 'csv' && fileExtension !== 'txt') {
            alert('Select a .csv or .txt file');
            return;
        }
        csvReader.onload = function (evt) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                const text = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.result;
                const fileHandler = new FileController(text);
                finalvalues = fileHandler.getData();
                columnNames = fileHandler.getColumnNames();
                yield renderTableControls();
            });
        };
        csvReader.readAsText(input);
    }));
    downloadButton.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const filteredValues = filterData(finalvalues, searchInput.value);
        const csvData = yield convertCsv(filteredValues, columnNames);
        yield downloadCSV(csvData, 'filtere_data.csv');
    }));
    searchInput.addEventListener('input', () => __awaiter(void 0, void 0, void 0, function* () {
        yield renderTableControls();
    }));
});
function renderTableControls() {
    return __awaiter(this, void 0, void 0, function* () {
        const searchTerm = searchInput.value;
        let filteredValues = filterData(finalvalues, searchTerm);
        //render table with filtered values
        const tableHTML = yield renderTable(filteredValues, currentPage, recordsPerPage);
        displayArea.innerHTML = tableHTML;
        //chart display
        yield renderChart(filteredValues);
        /* sort controls */
        document.querySelectorAll('.sort-btn').forEach(button => {
            button.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                const column = e.target.dataset.column;
                const order = e.target.dataset.order;
                filteredValues = sortColumns(filteredValues, column, order);
                renderTableControls();
            }));
        });
        //pagination controls 
        const paginationControls = pagination(filteredValues.length, currentPage, recordsPerPage);
        document.getElementById('paginationControls').innerHTML = paginationControls;
        document.querySelectorAll('.page-link').forEach(button => {
            button.addEventListener('click', (e) => {
                const targetPage = Number(e.target.dataset.page);
                if (targetPage) {
                    currentPage = targetPage;
                    renderTableControls();
                }
            });
        });
    });
}
function pagination(totalRecords, currentPage, recordsPerPage) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const maxButtons = 10;
    let paginationHTML = '<ul class="pagination">';
    //btn startl
    if (currentPage > 1) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="1" href="#">Start</a></li>`;
    }
    //btn previous
    if (currentPage > 1) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${currentPage - 1}" href="#">Previous</a></li>`;
    }
    //max buttons in view
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let finalPage = Math.min(totalPages, currentPage + Math.floor(maxButtons / 2));
    //adjust range
    if (finalPage - startPage < maxButtons - 1) {
        if (startPage === 1) {
            finalPage = Math.min(totalPages, startPage + maxButtons - 1);
        }
        else if (finalPage === totalPages) {
            startPage = Math.max(1, finalPage - maxButtons + 1);
        }
    }
    //btn number
    for (let i = startPage; i <= finalPage; i++) {
        paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" data-page="${i}" href="#">${i}</a>
        </li>`;
    }
    //btn next
    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${currentPage + 1}" href="#">Next</a></li>`;
    }
    //btn end
    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${totalPages}" href="#">End</a></li>`;
    }
    paginationHTML += '</ul>';
    return paginationHTML;
}
