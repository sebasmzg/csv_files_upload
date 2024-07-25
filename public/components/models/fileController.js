export class FileController {
    constructor(fileContent) {
        this.fileContent = fileContent;
        this.data = [];
        this.columnNames = [];
        this.processFile();
    }
    processFile() {
        const lines = this.fileContent.split(/[\r\n]+/).filter(line => line.trim() !== '');
        if (lines.length > 0) {
            this.columnNames = lines[0].split(','); //first columns are heads
            this.data = lines.slice(1).map(line => {
                const values = line.split(',');
                const row = {};
                this.columnNames.forEach((colName, index) => {
                    row[colName] = values[index] || '';
                });
                return row;
            });
        }
    }
    getData() {
        return this.data;
    }
    getColumnNames() {
        return this.columnNames;
    }
}
