export function filterData(arrayTable: string[][],searchTerm: string):string[][]{
    return arrayTable.filter(row=>
        row.some(cell=>cell.toLowerCase().includes(searchTerm.toLowerCase()))
    );
}