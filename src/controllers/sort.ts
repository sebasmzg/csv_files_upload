import { DataTable, ColumnName} from "../models/models";

export function sortColumns(data: DataTable, column:ColumnName, order: 'asc' | 'desc'): DataTable {
    return data.sort((a,b)=>{
        const valueA = a[column[0]]?.toString().toLowerCase() || '';
        const valueB = b[column[0]]?.toString().toLowerCase() || '';

        if(valueA < valueB) return order === 'asc' ? -1:1;
        if(valueA > valueB) return order === 'desc' ?1:-1;
        return 0
    })

}