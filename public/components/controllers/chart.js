"use strict";
/* import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import{ ColumnName, DataTable } from '../models/models.js';

// Define a function to create or update the chart
export function createOrUpdateChart(
    dataTable: DataTable,
    columnNames: ColumnName,
    chartElementId: string,
    chartInstance?: Chart
): Chart {
    const ctx = document.getElementById(chartElementId) as HTMLCanvasElement;

    // Prepare data for the chart
    const labels = columnNames;
    const data = labels.map(column => {
        const columnData = dataTable.map(row => parseFloat(row[column]) || 0);
        return columnData.reduce((a, b) => a + b, 0); // Aggregate values (e.g., sum)
    });

    if (chartInstance) {
        // Update the existing chart
        chartInstance.data.labels = labels;
        chartInstance.data.datasets[0].data = data;
        chartInstance.update();
        return chartInstance;
    } else {
        // Create a new chart
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Dataset',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
 */ 
