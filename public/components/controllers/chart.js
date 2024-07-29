var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const chart = document.getElementById('myChart');
const canvas = chart.getContext('2d');
let xAxis = [];
let yAxis = [];
export function renderChart(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (canvas) {
            const columnNames = Object.keys(data[0]);
            const column = columnNames[2];
            const columnData = data.map(row => row[column]);
            const uniqueColumnValues = [...new Set(columnData)];
            const counts = uniqueColumnValues.map(value => columnData.filter(val => val === value).length);
            xAxis = uniqueColumnValues;
            yAxis = counts;
            const chartIntance = new Chart(chart, {
                type: 'bar',
                data: {
                    labels: xAxis,
                    datasets: [{
                            label: 'Municipios por departamento',
                            data: yAxis
                        }]
                },
            });
            return chartIntance;
        }
        return null;
    });
}
//recorrer columna
//contar registros de columna
//labels = columna
//data = yaxis
