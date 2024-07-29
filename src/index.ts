import { FileController } from "./models/fileController.js";
import { renderTable } from "./controllers/table.js";
import { filterData } from "./controllers/filter.js";
import { ColumnName, DataRow, DataTable } from "./models/models.js";
import { downloadCSV,convertCsv } from "./controllers/downloadCsv.js";
import { sortColumns } from "./controllers/sort.js";
import { renderChart } from "./controllers/chart.js";

// Get DOM elements
const csvForm = <HTMLFormElement> document.getElementById('csvForm');
const csvFile = <HTMLInputElement> document.getElementById('csvFile');
const displayArea = <HTMLDivElement> document.getElementById('displayArea');
const searchInput = <HTMLInputElement> document.getElementById('searchInput');
const downloadButton = <HTMLButtonElement> document.getElementById('downloadCSV')

// Set initial values
const recordsPerPage = 10;
let currentPage = 1;
let finalvalues: DataRow[] = [];
let columnNames: ColumnName = [];

document.addEventListener('DOMContentLoaded',()=>{

    // Handle form submission
    csvForm.addEventListener('submit',async (e:Event)=>{
        e.preventDefault();

        const csvReader = new FileReader();

        const input = csvFile.files![0];
        const fileName = input.name;
        const fileExtension = fileName.split('.').pop()?.toLocaleLowerCase();

        if(fileExtension !== 'csv' && fileExtension !== 'txt'){
            alert('Select a .csv or .txt file');
            return;
        }

        csvReader.onload = async function(evt) {
            const text = evt.target?.result as string;
            const fileHandler = new FileController(text);
            finalvalues = fileHandler.getData();
            columnNames = fileHandler.getColumnNames();

            await renderTableControls()
        }

        csvReader.readAsText(input);
    });

    // Handle download button click
    downloadButton.addEventListener('click', async (e:Event)=>{
        e.preventDefault();
        const filteredValues = filterData(finalvalues,searchInput.value);
        const csvData = await convertCsv(filteredValues,columnNames);
        await downloadCSV(csvData,'filtere_data.csv');
    })

    // Handle search input change
    searchInput.addEventListener('input',async ()=>{
        await renderTableControls();

    });
})

// Render table controls
async function renderTableControls(){
    const searchTerm = searchInput.value;
    let filteredValues = filterData(finalvalues,searchTerm);

    // Render table with filtered values
    const tableHTML = await renderTable(filteredValues,currentPage,recordsPerPage);
    displayArea.innerHTML = tableHTML;

    /* Sort controls */
    document.querySelectorAll('.sort-btn').forEach(button=>{
        button.addEventListener('click', async (e:Event)=>{
            const column = (e.target as HTMLElement).dataset.column as string;
            const order = (e.target as HTMLElement).dataset.order as 'asc' | 'desc';

            filteredValues = sortColumns(filteredValues,column,order);
            renderTableControls();
        })
    })

    // Render chart
    updateChart(filteredValues);

    // Pagination controls
    const paginationControls = pagination(filteredValues.length,currentPage,recordsPerPage);
    document.getElementById('paginationControls')!.innerHTML = paginationControls;

    document.querySelectorAll('.page-link').forEach(button =>{
        button.addEventListener('click',(e)=>{
            const targetPage = Number((e.target as HTMLElement).dataset.page);
            if(targetPage){
                currentPage = targetPage;
                renderTableControls();
            }
        })
    })
}

// Chart instance
let currentChart: Chart | null = null;

// Chart function
async function updateChart (chartFilteredValues: DataTable) {
    if(currentChart){
        currentChart.destroy();
    }
    currentChart= await renderChart(chartFilteredValues);
}

// Pagination function
function pagination(totalRecords: number, currentPage:number, recordsPerPage:number): string {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const maxButtons = 10;
    let paginationHTML = '<ul class="pagination">';

    // Start button
    if (currentPage > 1) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="1" href="#">Start</a></li>`;
    }

    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${currentPage - 1}" href="#">Previous</a></li>`;
    }

    // Max buttons in view
    let startPage = Math.max(1,currentPage-Math.floor(maxButtons/2));
    let finalPage = Math.min(totalPages,currentPage+Math.floor(maxButtons/2));

    // Adjust range
    if(finalPage - startPage < maxButtons -1){
        if(startPage === 1){
            finalPage = Math.min(totalPages,startPage + maxButtons -1);
        } else if(finalPage===totalPages){
            startPage = Math.max(1,finalPage-maxButtons +1)
        }
    }

    // Number buttons
    for (let i = startPage; i <= finalPage; i++) {
        paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" data-page="${i}" href="#">${i}</a>
        </li>`;
    }

    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${currentPage + 1}" href="#">Next</a></li>`;
    }

    // End button
    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${totalPages}" href="#">End</a></li>`;
    }

    paginationHTML += '</ul>';
    return paginationHTML;
}
