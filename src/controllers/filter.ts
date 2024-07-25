import { DataRow,DataTable} from "../models/models";

export function filterData(arrayTable: DataTable, searchTerm: string): DataTable {
    if (!searchTerm) return arrayTable;
    const lowerCaseTerm = searchTerm.toLowerCase();
    return arrayTable.filter(row => 
        Object.values(row).some(cell => cell.toLowerCase().includes(lowerCaseTerm))
    );
}
