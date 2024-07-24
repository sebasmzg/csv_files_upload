var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderTable } from "./controllers/table.js";
const csvForm = document.getElementById('csvForm');
const csvFile = document.getElementById('csvFile');
const displayArea = document.getElementById('displayArea');
/* let final_values: string[][]=[]; */
csvForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let csvReader = new FileReader();
    const input = csvFile.files[0];
    csvReader.onload = function (evt) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const text = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.result;
            if (typeof text === 'string' || text instanceof String) {
                const lines = text.split(/[\r\n]+/).filter(line => line.trim() !== '');
                //val1, val2, val3 +\n create a new line
                const final_values = lines.map(line => line.split(','));
                const result = yield renderTable(final_values);
                displayArea.innerHTML = result;
                const th_values = document.getElementsByTagName('th');
                const td_values = document.getElementsByTagName('td');
                const capitalize_table_column = (table_e) => {
                    table_e.innerHTML = table_e.innerHTML[0].toUpperCase() + table_e.innerHTML.slice(1);
                };
                for (const th_val of th_values) {
                    capitalize_table_column(th_val);
                }
                for (const td_val of td_values) {
                    capitalize_table_column(td_val);
                }
            }
        });
    };
    csvReader.readAsText(input);
});
