import { DataRow, DataTable, ColumnName } from "./models";

export class FileController {
    private data: DataTable = [];
    private columnNames: ColumnName = [];

    constructor(private fileContent: string) {
        this.processFile();
    }

    // Process the file content and populate the data and columnNames properties
    private processFile() {
        const lines = this.fileContent.split(/[\r\n]+/).filter(line => line.trim() !== '');

        if (lines.length > 0) {
            // Split the first line to get the column names
            this.columnNames = lines[0].split(',');

            // Process the remaining lines to create data rows
            this.data = lines.slice(1).map(line => {
                const values = line.split(',');
                const row: DataRow = {};

                // Assign values to each column in the row
                this.columnNames.forEach((colName, index) => {
                    row[colName] = values[index] || '';
                });

                return row;
            });
        }
    }

    // Get the data table
    getData(): DataTable {
        return this.data;
    }

    // Get the column names
    getColumnNames(): ColumnName {
        return this.columnNames;
    }
}