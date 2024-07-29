var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Get the canvas element for the chart
const chart = document.getElementById('myChart');
const canvas = chart.getContext('2d');
// Initialize the x-axis and y-axis arrays
let xAxis = [];
let yAxis = [];
// Function to render the chart
export function renderChart(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (canvas) {
            // Get the column names from the data
            const columnNames = Object.keys(data[0]);
            // Select the column to be used for the chart
            const column = columnNames[2];
            // Get the data for the selected column
            const columnData = data.map(row => row[column]);
            // Get the unique values in the column
            const uniqueColumnValues = [...new Set(columnData)];
            // Count the occurrences of each unique value
            const counts = uniqueColumnValues.map(value => columnData.filter(val => val === value).length);
            // Assign the x-axis and y-axis values
            xAxis = uniqueColumnValues;
            yAxis = counts;
            // Create a new chart instance
            const chartInstance = new Chart(chart, {
                type: 'bar',
                data: {
                    labels: xAxis,
                    datasets: [{
                            label: 'Municipios por departamento',
                            data: yAxis
                        }]
                },
            });
            return chartInstance;
        }
        return null;
    });
}
