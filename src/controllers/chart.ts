import { Title } from "chart.js";
import { ColumnName, DataTable } from "../models/models";

// Get the canvas element for the chart
const chart = document.getElementById('myChart') as HTMLCanvasElement;
const canvas = chart.getContext('2d');

// Initialize the x-axis and y-axis arrays
let xAxis: ColumnName = [];
let yAxis: number[] = [];

// Function to render the chart
export async function renderChart(data: DataTable): Promise<Chart | null> {
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
}