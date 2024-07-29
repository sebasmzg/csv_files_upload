import { DataTable} from "../models/models";
// Function to sort columns
export function sortColumns(data: DataTable, column: string, order: 'asc' | 'desc'): DataTable {
    // Return the sorted data
    return data.sort((a,b)=>{
        const valueA = a[column]?.toString().toLowerCase() || '';
        const valueB = b[column]?.toString().toLowerCase() || '';
        // Compare the values
        if(valueA < valueB) return order === 'asc' ? -1:1;
        if(valueA > valueB) return order === 'desc' ?1:-1;
        return 0
    })

}