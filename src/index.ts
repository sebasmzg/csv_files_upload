import { renderTable } from "./controllers/table.js";

const csvForm = <HTMLFormElement> document.getElementById('csvForm');
const csvFile = <HTMLInputElement> document.getElementById('csvFile');
const displayArea = <HTMLDivElement> document.getElementById('displayArea');

/* let final_values: string[][]=[]; */

csvForm.addEventListener('submit',(e:Event)=>{
    e.preventDefault();

    let csvReader = new FileReader();

    const input = csvFile.files![0];

    csvReader.onload = async function(evt) {
        const text = evt.target?.result;
        if(typeof text === 'string' || text instanceof String){
            const lines = text.split(/[\r\n]+/).filter(line=>line.trim()!=='');
            //val1, val2, val3 +\n create a new line
            const final_values = lines.map(line=>line.split(','));

            const result = await renderTable(final_values);
            displayArea.innerHTML = result;
            
            const th_values = document.getElementsByTagName('th');
            const td_values = document.getElementsByTagName('td');

            const capitalize_table_column = (table_e: HTMLElement) =>{
                table_e.innerHTML = table_e.innerHTML[0].toUpperCase() + table_e.innerHTML.slice(1);
            }
            for (const th_val of th_values){
                capitalize_table_column(th_val);
            }
            for(const td_val of td_values){
                capitalize_table_column(td_val);
            }
           
        }
    }

    csvReader.readAsText(input);
})