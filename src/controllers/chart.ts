
import { ColumnName,DataTable } from "../models/models";

const chart = document.getElementById('myChart') as HTMLCanvasElement;
const canvas = chart.getContext('2d');
let xAxis: ColumnName = [];
let yAxis: number[] = [];

export async function renderChart(data: DataTable): Promise<void> {
    if(canvas){

        const columnNames = Object.keys(data[0]);
        const column = columnNames[2];
        const columnData = data.map(row=>row[column]);
        const uniqueColumnValues = [...new Set(columnData)];
        const counts = uniqueColumnValues.map(value=>columnData.filter(val=>val===value).length);
        xAxis = uniqueColumnValues;
        yAxis = counts;
    
        new Chart(chart,{
            type: 'bar',
            data: {
                labels: xAxis,
                datasets: [{
                    label: column,
                    data: yAxis
                }]
            }
        });
    }
}


//recorrer columna
//contar registros de columna
//labels = columna
//data = yaxis